<?php
    interface IApiEndpoint {
        public function get();

        public function post();

        public function put();

        public function delete();

        public function options();
    }
?>