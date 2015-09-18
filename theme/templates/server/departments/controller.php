<?php
include('../../server/departments/model.php');

class DepartmentCtrl {
	
	public static function create($data){
		if(isset($data['departmentname']) && empty($data['departmentname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Department Name is required'));
		}
		if(isset($data['departmentdesc']) && empty($data['departmentdesc'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Department desription is required'));
		}
		DepartmentModel::create($data);
	}

	public static function read(){
		DepartmentModel::read();
	}

	public static function detail($id){
		DepartmentModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['departmentname_modal']) && empty($data['departmentname_modal'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'department Name is required'));
		}
		if(isset($data['departmentdesc_modal']) && empty($data['departmentdesc_modal'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Department description is required'));
		}
		if(isset($data['departmentid_modal']) && empty($data['departmentid_modal'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'department id is required'));
		}

		DepartmentModel::update($id,$data);
	}

	public static function delete($id){
		DepartmentModel::delete($id);
	}
}

?>