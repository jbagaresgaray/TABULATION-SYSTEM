<?php
require_once '../../server/connection.php';

class ContestantModel {

	function __construct(){
    }

     private function do_upload($name, $tmp_name){
       	$upload_dir =  "../../server/upload/choice/";
       	if (!file_exists($upload_dir)) {
		    self::mkdir_r($upload_dir, 0777);
		    self::mkdir_r($upload_dir.'thumbs/', 0777);
		}
		if (is_dir($upload_dir) && is_writable($upload_dir)) {
		    move_uploaded_file($tmp_name, $upload_dir . $name);
	        $src = $upload_dir.$name;
	        $dest = $upload_dir.'thumbs/'.$name;
	        self::make_thumb($src,$dest,300);
		} else {
		    return print json_encode(array('success' =>false,'msg'=>'Upload directory is not writable, or does not exist.'),JSON_PRETTY_PRINT);
		}
    }

    private function mkdir_r($dirName, $rights=0777){
	    $dirs = explode('/', $dirName);
	    $dir='';
	    foreach ($dirs as $part) {
	        $dir.=$part.'/';
	        if (!is_dir($dir) && strlen($dir)>0)
	            mkdir($dir, $rights);
	    }
	} 

	private function make_thumb($src, $dest, $desired_width) {
        $source_image = imagecreatefromjpeg($src);
        $width = imagesx($source_image);
        $height = imagesy($source_image);
        $desired_height = floor($height * ($desired_width / $width));
        $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
        imagecopyresized($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
        imagejpeg($virtual_image, $dest);
    }

	public static function create($data/*,$files*/){
		$config= new Config();

		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		    return;
		}else{
			$allow = array("jpg", "jpeg", "gif", "png");
			$contestantname = $mysqli->real_escape_string($data['contestantname']);
			$gender = $mysqli->real_escape_string($data['gender']);
			$departmentid = $mysqli->real_escape_string($data['departmentid']);
			$eventid = $mysqli->real_escape_string($data['eventid']);
			//$name_pic4 = $files["pic4"]["name"];
            //$pic4 = $files["pic4"]["tmp_name"];

            /*if($name_pic4){
			    $info = explode('.', strtolower($name_pic4));
			    if (in_array(end($info),$allow)){
			    	$size = getimagesize($pic4);
		            if($size){
		            	self::do_upload($name_pic4,$pic4);
		            }else{
		            	$name_pic4 = $data['tmp_pic4'];
		            }
			    }else{
			        return print json_encode(array('success' =>false,'msg' =>'Invalid file type for Choices image. Supported files allowed are JPG,JPEG,GIF,PNG.'),JSON_PRETTY_PRINT);
			        die();
			    }
			}*/
			if ($stmt = $mysqli->prepare('INSERT INTO contestants (name,eventid,departmentid,gender) VALUES(?,?,?,?)')){
				$stmt->bind_param('ssss', $contestantname,$eventid,$departmentid,$gender);
				$stmt->execute();
				return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved', 'data'=>$data),JSON_PRETTY_PRINT);
			}else{
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error),JSON_PRETTY_PRINT);
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
			$query1 ="select c.*,d.*,e.* from contestants c, departments d,events e where c.departmentid = d.departmentid and e.eventid = c.eventid";
			$result1 = $mysqli->query($query1);
			$data = array();
			while($row = $result1->fetch_array(MYSQLI_ASSOC)){
				array_push($data,$row);
			}
			print json_encode(array('success' =>true,'status'=>200,'childs' =>$data),JSON_PRETTY_PRINT);
		}
	}

	public static function detail($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if ($mysqli->connect_errno) {
		    return print json_encode(array('success' =>false,'status'=>400,'msg' =>'Failed to connect to MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error));
		}else{
			$query1 ="select c.*,d.* from contestants c, departments d where c.departmentid = d.departmentid and c.contestantid=$id"; // and c.eventid=$id previously deleted
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
			$contestantname = $mysqli->real_escape_string($data['contestantname']);
			$gender = $mysqli->real_escape_string($data['gender']);
			$departmentname = $mysqli->real_escape_string($data['departmentname']);
			$eventname = $mysqli->real_escape_string($data['eventname']);
			$contestantid = $mysqli->real_escape_string($data['contestantid']);
			
			if ($stmt = $mysqli->prepare('update contestants set gender=?, name=?,eventid=(select eventid from events where eventname=? limit 1),departmentid=(select departmentid from departments where departmentname=? limit 1) where contestantid = ?')){
				$stmt->bind_param('sssss', $gender,$contestantname,$eventname,$departmentname,$contestantid);
				$stmt->execute();
				return print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully saved', 'data'=>$data),JSON_PRETTY_PRINT);
			}else{
				return print json_encode(array('success' =>false,'status'=>500,'msg' =>'Error message: %s\n', $mysqli->error),JSON_PRETTY_PRINT);
			} 
		}
	}

	public static function delete($id){
		$config= new Config();
		$mysqli = new mysqli($config->host, $config->user, $config->pass, $config->db);
		if($stmt = $mysqli->prepare('DELETE FROM contestants WHERE contestantid =?')){
			$stmt->bind_param('s', $id);
			$stmt->execute();
			$stmt->close();
			print json_encode(array('success' =>true,'status'=>200,'msg' =>'Record successfully deleted'),JSON_PRETTY_PRINT);
		}else{
			print json_encode(array('success' =>false,'status'=>200,'msg' =>'Error message: %s\n', $mysqli->error),JSON_PRETTY_PRINT);
		}
	}
}
?>
