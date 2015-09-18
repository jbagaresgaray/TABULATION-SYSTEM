<?php
include('../../server/events/model.php');

class EventCtrl {
	
	public static function create($data){
		if(isset($data['eventname']) && empty($data['eventname'])){
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
		EventModel::create($data);
	}

	public static function read(){
		EventModel::read();
	}

	public static function detail($id){
		EventModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['eventname']) && empty($data['eventname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'));
		}
		if(isset($data['eventdescription']) && empty($data['eventdescription'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'));
		}
		if(isset($data['eventdate']) && empty($data['eventdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'));
		}

		EventModel::update($id,$data);
	}

	public static function delete($id){
		EventModel::delete($id);
	}
}

?>