<?php
	include('../../server/cors.php');
	include('../../server/reports/controller.php');

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  case 'PUT':
		
	    break;
	  case 'POST':
			
	    break;
	  case 'GET':
	  	if(isset($request) && !empty($request) && $request[0] !== ''){
	  		$id = $request[0];
			ReportsCtrl::detail($id);
	  	}else{
			ReportsCtrl::read();
	  	}
	    break;
	  case 'DELETE':
	  
	    break;
	  default:
	    print json_encode('ENTRANCE EXAM API v.0.1 developed by: Philip Cesar B. Garay');
	    break;
	}
	exit();

?>
