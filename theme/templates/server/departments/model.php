<?php
require_once '../../server/connection.php';

class DepartmentModel {

	function __construct(){
    }

	public static function create($data){
		$config= new Config();

		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$departmentname = $mysqli->real_escape_string($data['departmentname']);
			$departmentdesc = $mysqli->real_escape_string($data['departmentdesc']);

			$checkQuery ="SELECT * FROM departments where departmentname='$departmentname'";
			$ress = $mysqli->query($checkQuery);
			$querydata = array();
			while($row = $ress->fetch_array(MYSQLI_ASSOC)){
				array_push($querydata,$row);
			}
			if(count($querydata) > 0){
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'department name already exist', 'data'=>$departmentname));
			} else {
				if ($stmt = $mysqli->prepare('INSERT INTO departments (departmentname,departmentdesc) VALUES(?,?)')){
				$stmt->bind_param('ss', $departmentname,$departmentdesc);
				$stmt->execute();
				return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved', 'data'=>$data));
				}else{
					return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error));
				}
			}
			
		}
	}

	public static function read(){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$query1 ="select * from departments";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data));
		}
	}

	public static function detail($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		}else{
			$query1 ="select * from departments where departmentid=$id";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data));
		}
	}

	public static function update($id,$data){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$departmentname_modal = $mysqli->real_escape_string($data['departmentname']);
			$departmentdesc_modal = $mysqli->real_escape_string($data['departmentdesc']);
			$departmentid_modal = $mysqli->real_escape_string($data['departmentid']);

			if ($stmt = $mysqli->prepare('UPDATE departments SET departmentname=?,departmentdesc=? WHERE departmentid=?')){
				$stmt->bind_param('sss', $departmentname_modal, $departmentdesc_modal, $departmentid_modal);
				$stmt->execute();
				return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved', 'data'=>$data));
			}else{
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error));
			} 
		}
	}

	public static function delete($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if($stmt = $mysqli->prepare('DELETE FROM departments WHERE departmentid =?')){
			$stmt->bind_param('s', $id);
			$stmt->execute();
			$stmt->close();
			print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully deleted'));
		}else{
			print json_encode(array('success' =>false,'status'=>200,'msg' =>'Error message: %s\n', $mysqli->error));
		}
	}
}
?>
