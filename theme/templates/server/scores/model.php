<?php
require_once '../../server/connection.php';

class ScoreModel {

	function __construct(){
    }

	public static function create($data){
		$config= new Config();

		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$eventid = $mysqli->real_escape_string($data['eventid']);
			$judgeid = $mysqli->real_escape_string($data['judgeid']);
			$criteriaid = $mysqli->real_escape_string($data['criteriaid']);
			$score = $mysqli->real_escape_string($data['score']);
			$contestantid = $mysqli->real_escape_string($data['contestantid']);

			if ($stmt = $mysqli->prepare('insert into scores(eventid,judgeid,criteriaid,score,contestantid) VALUES(?,?,?,?,?)')){
				$stmt->bind_param('sssss', $eventid,$judgeid,$criteriaid,$score,$contestantid);
				$stmt->execute();
				return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved', 'data'=>$data),JSON_PRETTY_PRINT);
			}else{
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error),JSON_PRETTY_PRINT);
			}
		}
	}

	public static function read(){
		/*$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$query1 ="SELECT * FROM judges";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data),JSON_PRETTY_PRINT);
		}*/
	}

	public static function detail($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		}else{
			$query1 ="select * from criteria where eventid=$id";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data),JSON_PRETTY_PRINT);
		}
	}

	public static function update($id,$data){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$eventid = $mysqli->real_escape_string($data['eventid']);
			$judgeid = $mysqli->real_escape_string($data['judgeid']);
			$criteriaid = $mysqli->real_escape_string($data['criteriaid']);
			$score = $mysqli->real_escape_string($data['score']);
			$contestantid = $mysqli->real_escape_string($data['contestantid']);

			if ($stmt = $mysqli->prepare('UPDATE scores SET score=? WHERE criteriaid=? and contestantid=?')){
				$stmt->bind_param('sss', $score,$criteriaid,$contestantid);
				$stmt->execute();
				return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved', 'data'=>$data),JSON_PRETTY_PRINT);
			}else{
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error),JSON_PRETTY_PRINT);
			} 
		}
	}

	public static function delete($id){
		/*$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if($stmt = $mysqli->prepare('DELETE FROM judges WHERE judgeid =?')){
			$stmt->bind_param('s', $id);
			$stmt->execute();
			$stmt->close();
			print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully deleted'),JSON_PRETTY_PRINT);
		}else{
			print json_encode(array('success' =>false,'status'=>200,'msg' =>'Error message: %s\n', $mysqli->error),JSON_PRETTY_PRINT);
		}*/
	}
}
?>
