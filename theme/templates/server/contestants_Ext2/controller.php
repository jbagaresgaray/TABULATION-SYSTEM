<?php
include('../../server/contestants_Ext2/model.php');

class ContestantExt2Ctrl {
	
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
		ContestantExt1Model::create($data);*/
	}

	public static function read(){
		ContestantExt2Model::read();
		//return print json_encode(array('chuie0'=>'gisolod sa GET without param'));
	}

	public static function detail($id){
		//return print json_encode(array('chuie0'=>'gisolod sa GET with param'));
		ContestantExt2Model::detail($id);
	}

	public static function update($id,$data){
		/*if(isset($data['contestantname']) && empty($data['contestantname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
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

		
		ContestantExt1Model::update($id,$data);*/
	}

	public static function delete($id){
		//ContestantExt1Model::delete($id);
	}
}

?>