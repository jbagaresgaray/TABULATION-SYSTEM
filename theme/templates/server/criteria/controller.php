<?php
include('../../server/criteria/model.php');

class CriteriaCtrl {
	
	public static function create($data){
		if(isset($data['criterianame']) && empty($data['criterianame'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['percentage']) && empty($data['percentage'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		CriteriaModel::create($data);
	}

	public static function read(){
		CriteriaModel::read();
	}

	public static function detail($id){
		CriteriaModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['criterianame']) && empty($data['criterianame'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['percentage']) && empty($data['percentage'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventname']) && empty($data['eventname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		if(isset($data['criteriaid']) && empty($data['criteriaid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}

		CriteriaModel::update($id,$data);
	}

	public static function delete($id){
		CriteriaModel::delete($id);
	}
}

?>