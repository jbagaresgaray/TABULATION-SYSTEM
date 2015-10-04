<?php
include( __DIR__.'/model.php');

class JudgesCtrl_2 {
	
	public static function create($data){
		// if(isset($data['judgefullname']) && empty($data['judgefullname'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		// }
		// if(isset($data['judgeuname']) && empty($data['judgeuname'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		// }
		// if(isset($data['judgepword']) && empty($data['judgepword'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		// }
		// if(isset($data['eventid']) && empty($data['eventid'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		// }
		// JudgesModel_2::create($data);
	}

	public static function read(){
		// JudgesModel_2::read();
	}

	public static function detail($gender){
		JudgesModel_2::detail($gender);
	}

	public static function update($id,$data){
		// if(isset($data['judgefullname']) && empty($data['judgefullname'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		// }
		// if(isset($data['judgeuname']) && empty($data['judgeuname'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		// }
		// if(isset($data['judgepword']) && empty($data['judgepword'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		// }
		// if(isset($data['judgeid']) && empty($data['judgeid'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		// }
		// JudgesModel_2::update($id,$data);
	}

	public static function delete($id){
		// JudgesModel_2::delete($id);
	}
}

?>