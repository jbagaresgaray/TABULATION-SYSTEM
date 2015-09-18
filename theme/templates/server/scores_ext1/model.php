<?php
require_once '../../server/connection.php';

class ScoreModel2 {

	function __construct(){
    }

	public static function create($data){
		
	}

	public static function read(){
		
	}

	public static function detail($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		}else{
			$query1 ="select distinct(con.name) as country, sco.score as visits, '#8A0CCF' as color
						from contestants con, events evt, criteria cri, judges jud, scores sco
						where con.contestantid = sco.contestantid
						and evt.eventid = sco.eventid
						and cri.criteriaid = sco.criteriaid
						and jud.judgeid = sco.judgeid
						and cri.criterianame = (select criterianame from criteria where criteriaid=$id)";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('data' =>$data));
		}
	}

	public static function update($id,$data){
		
	}

	public static function delete($id){
		
	}
}
?>
