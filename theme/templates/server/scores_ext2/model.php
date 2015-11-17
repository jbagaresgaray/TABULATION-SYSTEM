<?php
require_once '../../server/connection.php';

class ScoreModel3 {

	function __construct(){
    }

	public static function create($data){
		// $config= new Config();

		// $mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		// if ($mysqli->connect_errno) {
		//     print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		//     return;
		// }else{

		// 	$criteriaid = $mysqli->real_escape_string($data['criteriaid']);
		// 	$contestantid = $mysqli->real_escape_string($data['contestantid']);
		// 	$scoring = $mysqli->real_escape_string($data['scoring']);
		// 	$judgeid = $mysqli->real_escape_string($data['judgeid']);
		// 	$eventid = $mysqli->real_escape_string($data['eventId']);

		// 	$result = $mysqli->query("INSERT INTO scores(eventid,judgeid,criteriaid,score,contestantid) VALUES ($eventid,$judgeid,$criteriaid,$scoring,$contestantid)");

		// 	if ($result) {
		// 		return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved'));
		// 	}else{
		// 		return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error));
		// 	}
		// }
	}

	public static function read(){
		// $config= new Config();
		// $mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		// if ($mysqli->connect_errno) {
		//     print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		//     return;
		// }else{
		// 	$query1 ="SELECT c.departmentname as country, sum(a.score) as visits, '#8A0CCF' as color
		// 				FROM scores a,contestants b, departments c, criteria d
		// 				where a.contestantid = b.contestantid
		// 				and b.departmentid = c.departmentid
		// 				and a.criteriaid = d.criteriaid
		// 				group by departmentname
		// 				order by country asc";
		// 	$result1 = $mysqli->query($query1);
		// 	$data = array();
		// 	while($row = $result1->fetch_array(MYSQLI_ASSOC)){
		// 		array_push($data,$row);
		// 	}
		// 	//print json_encode(array('success' =>true,'status'=>200,'childs' =>$data));
		// 	print json_encode(array('data' =>$data));
		// }
	}

	public static function detail($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		}else{
			$query1 ="SELECT c.departmentid, c.departmentname as country, sum(a.score) as visits, '#8A0CCF' as color, a.eventid 
					 FROM scores a,contestants b, departments c, criteria d 
					 where a.contestantid = b.contestantid 
					 and b.departmentid = c.departmentid 
					 and a.criteriaid = d.criteriaid 
					 and a.eventid in (select z.eventid from events z where z.actid = '$id') 
					 group by departmentname
					 order by country asc";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			//print json_encode(array('success' =>true,'status'=>200,'childs' =>$data));
			print json_encode(array('data' =>$data));
		}
	}

	public static function update($data){
		// $config= new Config();
		// $mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		// if ($mysqli->connect_errno) {
		//     print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		//     return;
		// }else{

		// 	$criteriaid = $mysqli->real_escape_string($data['criteriaid']);
		// 	$contestantid = $mysqli->real_escape_string($data['contestantid']);
		// 	$scoring = $mysqli->real_escape_string($data['scoring']);
		// 	$judgeid = $mysqli->real_escape_string($data['judgeid']);
		// 	$eventid = $mysqli->real_escape_string($data['eventId']);

		// 	$sql = "UPDATE scores SET score=$scoring WHERE (eventid=$eventid AND judgeid=$judgeid AND criteriaid=$criteriaid AND contestantid=$contestantid)";
		// 	$result = $mysqli->query($sql);
		// 	if ($result) {
		// 		return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully updated'));
		// 	}else{
		// 		return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Error message: %s\n', $mysqli->error));
		// 	}
		// }
	}

	public static function delete($id){
		/*$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if($stmt = $mysqli->prepare('DELETE FROM judges WHERE judgeid =?')){
			$stmt->bind_param('s', $id);
			$stmt->execute();
			$stmt->close();
			print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully deleted'));
		}else{
			print json_encode(array('success' =>false,'status'=>200,'msg' =>'Error message: %s\n', $mysqli->error));
		}*/
	}
}
?>
