<?php
require_once '../../server/connection.php';

class CriteriaModel {

	function __construct(){
    }

	public static function create($data){
		$config= new Config();

		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$criterianame = $mysqli->real_escape_string($data['criterianame']);
			$percentage = $mysqli->real_escape_string($data['percentage']);
			$eventid = $mysqli->real_escape_string($data['eventid']);

			$checkQuery ="SELECT * FROM criteria where criterianame='$criterianame' and eventid = $eventid";
			$ress = $mysqli->query($checkQuery);
			$querydata = array();
			while($row = $ress->fetch_array(MYSQLI_ASSOC)){
				array_push($querydata,$row);
			}
			if(count($querydata) > 0){
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'criteria name already exist', 'data'=>$criterianame));
			} else {
				if ($stmt = $mysqli->prepare('INSERT INTO criteria(criterianame,percentage,eventid) VALUES(?,?,?)')){
				$stmt->bind_param('sss', $criterianame,$percentage,$eventid);
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
			$query1 ="select a.*,b.* from criteria a, events b where a.eventid = b.eventid";
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
			$query1 ="SELECT * FROM criteria where criteriaid=$id";
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
			$criterianame = $mysqli->real_escape_string($data['criterianame']);
			$percentage = $mysqli->real_escape_string($data['percentage']);
			$eventname = $mysqli->real_escape_string($data['eventname']);
			$criteriaid = $mysqli->real_escape_string($data['criteriaid']);

			if ($stmt = $mysqli->prepare('update criteria set criterianame=?, percentage=?, eventid=(select eventid from events where eventname=? limit 1) where criteriaid=?')){
				$stmt->bind_param('ssss', $criterianame,$percentage,$eventname,$criteriaid);
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
		if($stmt = $mysqli->prepare('DELETE FROM criteria WHERE criteriaid =?')){
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
