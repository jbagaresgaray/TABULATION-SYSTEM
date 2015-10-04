<?php
require_once '../../server/connection.php';

class CriteriaExt1Model {

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
			$query1 ="SELECT a.name,c.*,c.percentage, b.score
						FROM criteria c
						join contestants a
						left join scores b
						on a.contestantid = b.contestantid
						and b.criteriaid = c.criteriaid
						where a.contestantid = $id
            			and c.eventid=(select eventid from contestants where contestantid=$id)";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data));
		}
	}

	public static function update($id,$data){
		
	}

	public static function delete($id){
		
	}
}
?>
