<?php
include( __DIR__.'/model.php');

class JudgesCtrl {
	
	public static function create($data){
		if(isset($data['judgefullname']) && empty($data['judgefullname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['judgeuname']) && empty($data['judgeuname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['judgepword']) && empty($data['judgepword'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		JudgesModel::create($data);
	}

	public static function read(){
		JudgesModel::read();
	}

	public static function detail($id){
		JudgesModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['judgefullname']) && empty($data['judgefullname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['judgeuname']) && empty($data['judgeuname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['judgepword']) && empty($data['judgepword'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}

		JudgesModel::update($id,$data);
	}

	public static function delete($id){
		JudgesModel::delete($id);
	}
}

?>