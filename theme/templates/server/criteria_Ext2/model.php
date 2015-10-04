<?php
require_once '../../server/connection.php';

class CriteriaExt2Model {

	function __construct(){
    }

	public static function create($data){
		
	}

	public static function read(){
		
	}

	public static function detail($eventid){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		}else{
			if($eventid == 'all'){
				$query1 ="select a.*,b.* from criteria a right join events b on a.eventid = b.eventid";
				$result1 = $mysqli->query($query1);
				$data = array();
					while($row = $result1->fetch_array(MYSQLI_ASSOC)){
						array_push($data,$row);
					}
				print json_encode(array('success' =>true,'status'=>200,'childs' =>$data),JSON_PRETTY_PRINT);
			} else {
				$query1 ="select a.*,b.* from criteria a right join events b on a.eventid = b.eventid and a.eventid = $eventid";
				$result1 = $mysqli->query($query1);
				$data = array();
					while($row = $result1->fetch_array(MYSQLI_ASSOC)){
						array_push($data,$row);
					}
				print json_encode(array('success' =>true,'status'=>200,'childs' =>$data),JSON_PRETTY_PRINT);
			}
			
		}
	}

	public static function update($id,$data){
		
	}

	public static function delete($id){
		
	}
}
?>
