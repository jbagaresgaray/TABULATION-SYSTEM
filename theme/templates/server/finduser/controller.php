<?php
include('../../server/finduser/model.php');

class LoginCtrl {
	
	public static function login($data){
		if(isset($data['username']) && empty($data['username'])){
			return print json_encode(array('success'=>false,'status'=>200,'msg'=>'Username is required'));
		}
		if(isset($data['password']) && empty($data['password'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Password is required'));
		}else{
			LoginModel::login($data);
		}
	}
}

?>
