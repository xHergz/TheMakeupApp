<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';

    define("CreateUser", "CreateUser");

    class UserDal extends DataAccessLayer {
        public function CreateUser($email, $password, $displayName, $firstName, $lastName) {
            $parameterArray = array(
                new DatabaseParameter($email, PDO::PARAM_STR),
                new DatabaseParameter($password, PDO::PARAM_STR),
                new DatabaseParameter($displayName, PDO::PARAM_STR),
                new DatabaseParameter($firstName, PDO::PARAM_STR),
                new DatabaseParameter($lastName, PDO::PARAM_STR)
            );
            return $this->_connectionInfo->ExecuteStoredProcedureWithStatus(CreateUser, $parameterArray);
        }
    }
?>
