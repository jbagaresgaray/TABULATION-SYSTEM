<?php
include('../../server/activities/model.php');

class AdminCtrl {
	
	public static function create($data){
		if(isset($data['actname']) && empty($data['actname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['actstartdate']) && empty($data['actstartdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['actenddate']) && empty($data['actenddate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		if(isset($data['userid']) && empty($data['userid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'User id is required'));
		}
		ActivityModel::create($data);
	}

	public static function read(){
		ActivityModel::read();
	}

	public static function detail($id){
		ActivityModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['actname']) && empty($data['actname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['actstartdate']) && empty($data['actstartdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['actenddate']) && empty($data['actenddate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}

		ActivityModel::update($id,$data);
	}

	public static function delete($id){
		ActivityModel::delete($id);
	}
}

?>