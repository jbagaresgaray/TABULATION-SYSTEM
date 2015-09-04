<?php
include( __DIR__.'/model.php');

class LoginCtrl {
	
	public static function login($data){
		if(isset($data['username']) && empty($data['username'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Username Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['password']) && empty($data['password'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Password is required'),JSON_PRETTY_PRINT);
		}

		LoginModel::login($data);
	}
}

?>