<?php
	include('../../server/cors.php');
	include('../../server/judgeLogin/controller.php');

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  case 'PUT':
	    break;
	  case 'POST':
	  		/*$data["username"] = $_POST['username'];
			$data["password"] = $_POST['password'];*/
	 	 	JudgeLoginCtrl::login($_POST);
	    break;
	  case 'GET':
	  	break;
	  case 'DELETE':
	    break;
	}
	exit();

?>
