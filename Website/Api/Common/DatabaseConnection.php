<?php
	require_once __DIR__.'/DatabaseResponse.php';
	require_once __DIR__.'/Log.php';
	require_once __DIR__.'/Utilities.php';
	
	define("WindowsDbConnectionConfig", "C:\Program Files\HerWal\TheMakeupApp\Config\DatabaseConnection.config");
	define("LinuxDbConnectionConfig", "/etc/HerWal/TheMakeupApp/Config/DatabaseConnection.config");
	define("ServerTag", "Server");
	define("UsernameTag", "Username");
	define("PasswordTag", "Password");
	define("DatabaseTag", "Database");
	
	class DatabaseConnection{
		const STATUS_SUCCESS = 0;
		const STATUS_ERROR = -101;
		const STATUS_INVALID_PARAMETERS = -102;

		private $_server;
		private $_username;
		private $_password;
		private $_database;
		private $_mysqlConnection;
		
		public $IsConnected;
		
		public function __construct(){
			$IsConnected = false;
		}
		
		// Parses the connection info from the config file
		private function ParseConnectionInfo(){
			$connectionConfigPath = "";
			if (IsWindows()) {
				$connectionConfigPath = WindowsDbConnectionConfig;
			} else {
				$connectionConfigPath = LinuxDbConnectionConfig;
			}

			Log::LogInformation('Parsing Database Connection Information from \''.$connectionConfigPath.'\'');
			$connectionInfo = simplexml_load_file($connectionConfigPath) or die("Unable to open connection info file");
			
			if (isset($connectionInfo->Server)) {
				$this->_server = (string)$connectionInfo->Server;

				if (isset($connectionInfo->Username)) {
					$this->_username = $connectionInfo->Username;

					if (isset($connectionInfo->Password)) {
						$this->_password = $connectionInfo->Password;

						if (isset($connectionInfo->Database)) {
							$this->_database = $connectionInfo->Database;
						}
						else {
							Log::LogError('No database tag present');
						}
					}
					else {
						Log::LogError('No password tag present');
					}
				}
				else {
					Log::LogError('No username tag present');
				}
			}
			else {
				Log::LogError('No server tag present');
			}
			
		}
		
		// Initializes the database connection
		public function Initialize(){
			//Get the connection info
			$this->ParseConnectionInfo();
			Log::LogInformation("Initializing Database Connection with mysql:host={$this->_server};dbname={$this->_database};username={$this->_username};");

			try {
				$this->_mysqlConnection = new PDO("mysql:host={$this->_server};dbname={$this->_database};", $this->_username, $this->_password);
			}
			catch(PDOException $exception){
				//Log the error
				Log::LogError('Failed to Initialize Database Connection.');
				Log::LogError($exception->getMessage());
				return false;
			}
			
			return true;
		}

		// Closes the database connection
		public function Close() {
			// Setting the PDO Connection to null closes the connection
			$this->_mysqlConnection = null;
			Log::LogInformation('Closing Database Connection.');
		}

		// Execute a stored procedure with no parameters
		public function ExecuteStoredProcedure($procedureName) {
			$statement = $this->_mysqlConnection->prepare("CALL {$procedureName};");
			return $this->ExecutePdoStatement($statement);
		}

		// Execute a stored prodcedure with parameters
		public function ExecuteStoredProcedureWithStatus($procedureName, $parameters) {
			$numberOfParameters = count($parameters);
			// Get a string of '?' for the parameters
			$parameterString = $this->CreateParameterString($numberOfParameters);
			$statement = $this->_mysqlConnection->prepare("CALL {$procedureName}({$parameterString});");
			// Bind the parameters given to the statement
			for($paramPos = 0; $paramPos < $numberOfParameters; $paramPos++){
				// Add 1 to the param pos because the statement paramters are 1 indexed
				$statement->bindParam($paramPos + 1, $parameters[$paramPos]->Value, $parameters[$paramPos]->Type);
			}
			Log::LogInformation('Executing stored procedure with parameters: '.$statement->queryString);
			return $this->ExecutePdoStatement($statement);
		}

		// Create a database response object to indicate a general error
		public function CreateDatabaseErrorResponse() {
			Log::LogError('Database Error');
			return new DatabaseResponse(
				[],
				self::STATUS_ERROR
			);
		}

		// Create a database response object to indicate invalid parameters
		public function CreateParameterErrorResponse() {
			Log::LogError('Parameter Error');
			return new DatabaseResponse(
				[],
				self::STATUS_INVALID_PARAMETERS
			);
		}

		// Create a comma separated string of ? for parameters in a pdo statement
		private function CreateParameterString($numberOfParameters) {
			return join(', ', array_fill(0, $numberOfParameters, '?'));
		}

		// Execute a statement and return the appropriate response
		private function ExecutePdoStatement($statement) {
			if (!$statement->execute()) {
				Log::LogError('Failed to execute PDO Statement: '.implode(" | ", $statement->errorInfo()));
			}

			if ($statement->rowCount() == 1) {
				return $statement->fetch(PDO::FETCH_ASSOC);
			}
			return $statement->fetchAll(PDO::FETCH_ASSOC);
		}
	}
?>