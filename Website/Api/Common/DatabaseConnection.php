<?php
	require_once __DIR__.'/ProcedureResponse.php';
	require_once __DIR__.'/Log.php';
	require_once __DIR__.'/Utilities.php';
	
	define("WindowsDbConnectionConfig", "C:\Program Files\HerWal\TheMakeupApp\Config\DatabaseConnection.config");
	define("LinuxDbConnectionConfig", "/etc/HerWal/TheMakeupApp/Config/DatabaseConnection.config");
	define("ServerTag", "Server");
	define("UsernameTag", "Username");
	define("PasswordTag", "Password");
	define("DatabaseTag", "Database");
	define("InputParameterMarker", "?");
	define("OutputParameterMarker", "!");
	
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
		public function ExecuteStoredProcedure($procedureName, $dtoClass, $parameters = array()) {
			$inputParameters = array_filter($parameters, [$this, 'FilterInputParameters']);
			$outputParameters = array_filter($parameters, [$this, 'FilterOutputParameters']);
			echo 'Input Parameters: ';
			print_r($inputParameters);
			echo 'Output Parameters: ';
			print_r($outputParameters);
			echo '<br>';
			$parameterString = $this->CreateParameterString($inputParameters, $outputParameters);
			echo 'P.String Before Bind: ' . $parameterString . '<br>';
			$this->BindOutputParameters($parameterString, $outputParameters);
			echo 'P.String After Bind: ' . $parameterString . '<br>';
			$statement = $this->_mysqlConnection->prepare("CALL {$procedureName}({$parameterString});");
			$this->BindInputParameters($statement, $inputParameters);
			Log::LogInformation('Executing stored procedure: '.$statement->queryString);
			$results = $this->ExecutePdoStatement($statement, $dtoClass);
			$statement->closeCursor();
			$outputs = $this->GetOutputParameters($outputParameters);
			return new ProcedureResponse($outputs, $results);
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

		// Execute a function
		public function ExecuteFunction($functionName, $parameters) {
			$numberOfParameters = count($parameters);
			// Get a string of '?' for the parameters
			$parameterString = $this->CreateParameterString($numberOfParameters);
			$statement = $this->_mysqlConnection->prepare("SELECT {$functionName}({$parameterString});");
			// Bind the parameters given to the statement
			for($paramPos = 0; $paramPos < $numberOfParameters; $paramPos++){
				// Add 1 to the param pos because the statement paramters are 1 indexed
				$statement->bindParam($paramPos + 1, $parameters[$paramPos]->Value, $parameters[$paramPos]->Type);
			}
			Log::LogInformation('Executing function with parameters: '.$statement->queryString);
			$response = $this->ExecutePdoStatement($statement);
			return end($response);
		}

		public function ExecuteQuery($queryString) {
			$statement = $this->_mysqlConnection->prepare($queryString);
			Log::LogInformation('Executing query: ' . $queryString);
			return $this->ExecutePdoStatement($statement);
		}

		private function FilterInputParameters($parameter) {
			if (isset($parameter->Direction) && $parameter->Direction == ParameterDirection::IN) {
				return true;
			}
			return false;
		}

		private function FilterOutputParameters($parameter) {
			if (isset($parameter->Direction) && $parameter->Direction == ParameterDirection::OUT) {
				return true;
			}
			return false;
		}

		private function CreateParameterString($inputParameters, $outputParameters = null) {
			// Create a comma separated string of markers for input parameters to be bound to a PDO statement and markers
			// for output parameters to be replaced with their names.
			$parameterString = join(', ', array_fill(0, count($inputParameters), InputParameterMarker));
			if ($outputParameters != null) {
				$outputParameterString = join(', ', array_fill(0, count($outputParameters), OutputParameterMarker));
				// Check if the parameter string is empty (no input params)
				if (count($inputParameters) == 0) {
					$parameterString = $outputParameterString;
				}
				else {
					$parameterString = $parameterString . ', ' . $outputParameterString;
				}
			}
			return $parameterString;
		}

		private function BindOutputParameters(&$parameterString, $outputParameters) {
			// Replace the !'s in the parameter string with the output parameters
			foreach($outputParameters as $param) {
				$parameterString = str_replace_first(OutputParameterMarker, $param->Value, $parameterString);
			}
		}

		private function BindInputParameters(&$statement, $inputParameters) {
			// Bind the parameters given to the statement
			$numberOfParameters = count($inputParameters);
			for($paramPos = 0; $paramPos < $numberOfParameters; $paramPos++){
				// Add one to paramPos because binding params is 1 indexed
				$statement->bindParam($paramPos + 1, $inputParameters[$paramPos]->Value, $inputParameters[$paramPos]->Type);
			}
		}

		private function ExecutePdoStatement($statement, $dtoClass = null) {
			// Execute a statement and return the appropriate response
			if (!$statement->execute()) {
				Log::LogError('Failed to execute PDO Statement: '.implode(" | ", $statement->errorInfo()));
			}
			if ($dtoClass == null) {
				if ($statement->rowCount() == 1) {
					return $statement->fetch(PDO::FETCH_ASSOC);
				}
				return $statement->fetchAll(PDO::FETCH_ASSOC);
			}
			if ($statement->rowCount() == 1) {
				$statement->setFetchMode(PDO::FETCH_CLASS, $dtoClass);
				return $statement->fetch();
			}
			return $statement->fetchAll(PDO::FETCH_CLASS, $dtoClass);
		}

		private function GetOutputParameters($outputParameters) {
			if (count($outputParameters) == 0) {
				return array();
			}
			$queryString = "SELECT " . join(', ', array_column($outputParameters, 'Value')) . ";";
			return $this->ExecuteQuery($queryString);
		}
	}
?>