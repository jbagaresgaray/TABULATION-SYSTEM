<?php
include('../../server/filtercontestants/model.php');

class FilterContestantCtrl {
	
	public static function create($data){
		/*if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['departmentid']) && empty($data['departmentid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		FilterContestantModel::create($data);*/
	}

	public static function read(){
		FilterContestantModel::read();
	}

	public static function detail($id){
		FilterContestantModel::detail($id);
	}

	public static function update($id,$data){
		/*if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['departmentid']) && empty($data['departmentid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}

		FilterContestantModel::update($id,$data);*/
	}

	public static function delete($id){
		//FilterContestantModel::delete($id);
	}
}

?>