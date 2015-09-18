<?php
require_once '../../server/connection.php';

class JudgeLoginModel {

	function __construct(){
    }

	public static function login($data){
		$config= new Config();

		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$username = $mysqli->real_escape_string($data['username']);
			$password = $mysqli->real_escape_string($data['password']);
			
			$query1 ="SELECT * FROM judges WHERE judgeuname = '$username' AND judgepword='$password'";
			$result = $mysqli->query($query1);
			if ($result) {
	            if($row = $result->fetch_assoc()){
	                /*** set the session user_id variable ***/
	                $_SESSION['user'] = $row;
	                /*** set a form token ***/
	                $form_token = md5( uniqid('auth', true) );

	                /*** set the session form token ***/
	                $_SESSION['auth_token'] = $form_token;
	                /*** tell the user we are logged in ***/
	                print json_encode(array('success' =>true,'status'=>200,'form_token' =>$form_token,'childs'=>$row));
	            }else{
	                $message = 'Login Failed';
	                print json_encode(array('success' =>false,'status'=>200,'msg' =>$message));
	            }
	        }else{
	            $message = 'Error with SQL' . $query1;
	            print json_encode(array('success' =>false,'status'=>400,'msg' =>$message));
	        }
			
		}
	}
}
?>
