<?php
require_once '../../server/connection.php';

class ReportsbyEvent2Model {

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
			$query1 = "SELECT sco.contestantid, con.name, sum(sco.score) as score, dep.departmentname
					   from scores sco
					   inner join contestants con
             		   join departments dep
					   where con.contestantid = sco.contestantid
             		   and dep.departmentid = con.departmentid
					   and sco.eventid = $id group by sco.contestantid order by score desc";

			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data),JSON_PRETTY_PRINT);
		}
	}

	public static function update($id,$data){
		
	}

	public static function delete($id){
		
	}
}
?>
