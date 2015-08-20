<?php
include( __DIR__.'/model.php');

class DepartmentCtrl {
	
	public static function create($data){
		/*if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['departmentid']) && empty($data['departmentid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		DepartmentModel::create($data);*/
	}

	public static function read(){
		DepartmentModel::read();
	}

	public static function detail($id){
		//DepartmentModel::detail($id);
	}

	public static function update($id,$data){
		/*if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['departmentid']) && empty($data['departmentid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}

		DepartmentModel::update($id,$data);*/
	}

	public static function delete($id){
		//DepartmentModel::delete($id);
	}
}

?>