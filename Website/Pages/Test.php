<?php
    require_once '../../private/Api/DataAccessLayer/TestDal.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    // Call Test Proc with output param
    $testDal = new TestDal();
    $testDal->Initialize();
    $userDal = new UserDal();
    $userDal->Initialize();

    print_r($testDal->ProcWithNoParams());
    echo '<br> <br>';
    print_r($testDal->ProcWithParams());
    echo '<br> <br>';
    print_r($testDal->ProcWithParamsAndOutput());
    echo '<br> <br>';
    print_r($testDal->ProcWithOnlyOutput());
    echo '<br> <br>';
    print_r($userDal->IsSessionKeyValid('aaa'));
    echo '<br> <br>';
    print_r($testDal->QueryString());
    echo '<br> <br>';
?>