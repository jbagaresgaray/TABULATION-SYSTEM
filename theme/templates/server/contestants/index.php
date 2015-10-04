<?php
	include('../../server/cors.php');
	include('../../server/contestants/controller.php');

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  case 'PUT':
			$data=parse_str( file_get_contents( 'php://input' ), $_PUT );
			foreach ($_PUT as $key => $value){
					unset($_PUT[$key]);
					$_PUT[str_replace('amp;', '', $key)] = $value;
			}
			$_REQUEST = array_merge($_REQUEST, $_PUT);

			if(isset($request) && !empty($request) && $request[0] !== ''){
				$id = $request[0];
				ContestantCtrl::update($id,$_REQUEST);
			}else{
				ContestantCtrl::update(null,$_REQUEST);
			}
	    break;
	  case 'POST':
	  		if(isset($request) && !empty($request) && $request[0] !== ''){
				if ($request[0] == 'update'){
					ContestantCtrl::update($_POST,$_FILES);
				}
			}else{
				ContestantCtrl::create($_POST,$_FILES);
			}
	    break;
	  case 'GET':
	  	if(isset($request) && !empty($request) && $request[0] !== ''){
	  		$id = $request[0];
			ContestantCtrl::detail($id);
	  	}else{
			ContestantCtrl::read();
	  	}
	    break;
	  case 'DELETE':
	  	if(isset($request) && !empty($request) && $request[0] !== ''){
	  		$id = $request[0];
				ContestantCtrl::delete($id);
	  	}
	    break;
	  default:
	    print json_encode('ENTRANCE EXAM API v.0.1 developed by: Philip Cesar B. Garay');
	    break;
	}
	exit();

?>
