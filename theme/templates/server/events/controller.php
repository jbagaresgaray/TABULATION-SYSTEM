<?php
include( __DIR__.'/model.php');

class EventCtrl {
	
	public static function create($data){
		if(isset($data['eventname']) && empty($data['eventname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['eventdescription']) && empty($data['eventdescription'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['eventdate']) && empty($data['eventdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['actid']) && empty($data['actid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
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
		if(isset($data['actname']) && empty($data['actname'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['actstartdate']) && empty($data['actstartdate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['actenddate']) && empty($data['actenddate'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}

		EventModel::update($id,$data);
	}

	public static function delete($id){
		EventModel::delete($id);
	}
}

?>