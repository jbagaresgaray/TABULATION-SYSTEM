<?php
include('../../server/contestants/model.php');

class ContestantCtrl {
	
	public static function create($data){
		if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['departmentid']) && empty($data['departmentid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		if(isset($data['gender']) && empty($data['gender'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		ContestantModel::create($data);
	}

	public static function read(){
		ContestantModel::read();
	}

	public static function detail($id){
		ContestantModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['gender']) && empty($data['gender'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'gender Name is required'));
		}
		if(isset($data['departmentname']) && empty($data['departmentname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventname']) && empty($data['eventname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		if(isset($data['contestantid']) && empty($data['contestantid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}

		
		ContestantModel::update($id,$data);
	}

	public static function delete($id){
		ContestantModel::delete($id);
	}
}

?>