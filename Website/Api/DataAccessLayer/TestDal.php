<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';

    class TestDto {
        public $ColumnOne;
        public $ColumnTwo;
        public $ColumnThree;
    }

    class TestDal extends DataAccessLayer {
        public function ProcWithNoParams() {
            return $this->_connectionInfo->ExecuteStoredProcedure('ProcWithNoParams', 'TestDto');
        }

        public function ProcWithParams() {
            $parameterArray = array(
                new DatabaseParameter('paramOne', PDO::PARAM_STR, '_paramOne', ParameterDirection::IN),
                new DatabaseParameter('paramTwo', PDO::PARAM_STR, '_paramTwo', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteStoredProcedure('ProcWithParams', 'TestDto', $parameterArray);
        }

        public function ProcWithParamsAndOutput() {
            $parameterArray = array(
                new DatabaseParameter('paramOne', PDO::PARAM_STR, '_paramOne', ParameterDirection::IN),
                new DatabaseParameter('paramTwo', PDO::PARAM_STR, '_paramTwo', ParameterDirection::IN),
                new DatabaseParameter('@statusOne', PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            return $this->_connectionInfo->ExecuteStoredProcedure('ProcWithParamsAndOutput', 'TestDto', $parameterArray);
        }

        public function ProcWithOnlyOutput() {
            $parameterArray = array(
                new DatabaseParameter('@statusOne', PDO::PARAM_STR, '_status', ParameterDirection::OUT),
                new DatabaseParameter('@statusTwo', PDO::PARAM_STR, '_statusTwo', ParameterDirection::OUT)
            );
            return $this->_connectionInfo->ExecuteStoredProcedure('ProcWithOnlyOutput', 'TestDto', $parameterArray);
        }

        public function QueryString() {
            return $this->_connectionInfo->ExecuteQuery("SELECT * FROM Full_Session_Log");
        }
    }
?>