<?php
require_once '../../server/connection.php';

class EventModel {

	function __construct(){
    }

	public static function create($data){
		$config= new Config();

		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$eventname = $mysqli->real_escape_string($data['eventname']);
			$eventdescription = $mysqli->real_escape_string($data['eventdescription']);
			$eventdate = $mysqli->real_escape_string($data['eventdate']);
			$actid = $mysqli->real_escape_string($data['actid']);

			$checkQuery ="SELECT * FROM events where eventname='$eventname'";
			$ress = $mysqli->query($checkQuery);
			$querydata = array();
			while($row = $ress->fetch_array(MYSQLI_ASSOC)){
				array_push($querydata,$row);
			}
			if(count($querydata) > 0){
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'event name already exist', 'data'=>$eventname));
			} else {
				if ($stmt = $mysqli->prepare('INSERT INTO events(eventname,eventdescription,eventdate,actid) VALUES(?,?,?,?)')){
				$stmt->bind_param('ssss', $eventname,$eventdescription,$eventdate,$actid);
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
			$query1 ="SELECT * FROM events";
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
			$query1 ="SELECT * FROM events where eventid=$id";
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
			$eventname = $mysqli->real_escape_string($data['eventname']);
			$eventdescription = $mysqli->real_escape_string($data['eventdescription']);
			$eventdate = $mysqli->real_escape_string($data['eventdate']);
			$eventid = $mysqli->real_escape_string($data['eventid']);
			if ($stmt = $mysqli->prepare('UPDATE events SET eventname=?,eventdescription=?,eventdate=? WHERE eventid=?')){
				$stmt->bind_param('ssss', $eventname,$eventdescription,$eventdate,$eventid);
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
		if($stmt = $mysqli->prepare('DELETE FROM events WHERE eventid =?')){
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
