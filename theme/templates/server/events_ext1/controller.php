<?php
include('../../server/events_ext1/model.php');

class EventExt1Ctrl {
	
	public static function create($data){
		/*if(isset($data['eventname']) && empty($data['eventname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['eventdescription']) && empty($data['eventdescription'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventdate']) && empty($data['eventdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		if(isset($data['actid']) && empty($data['actid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}
		EventExt1Model::create($data);*/
	}

	public static function read(){
		//EventExt1Model::read();
	}

	public static function detail($id){
		EventExt1Model::detail($id);
	}

	public static function update($id,$data){
		/*if(isset($data['eventname']) && empty($data['eventname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['eventdescription']) && empty($data['eventdescription'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventdate']) && empty($data['eventdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}

		EventExt1Model::update($id,$data);*/
	}

	public static function delete($id){
		//EventExt1Model::delete($id);
	}
}

?>