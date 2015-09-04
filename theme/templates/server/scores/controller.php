<?php
include( __DIR__.'/model.php');

class ScoreCtrl {
	
	public static function create($data){
		if(isset($data['criteriaid']) && empty($data['criteriaid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'criteriaid is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['contestantid']) && empty($data['contestantid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'contestantid is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['scoring']) && empty($data['scoring'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'score is required'),JSON_PRETTY_PRINT);
		}
		ScoreModel::create($data);
	}

	public static function read(){
		ScoreModel::read();
	}

	public static function detail($id){
		ScoreModel::detail($id);
	}

	public static function update($id,$data){
		if(isset($data['eventid']) && empty($data['eventid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Activity Name is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['judgeid']) && empty($data['judgeid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'Start date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['criteriaid']) && empty($data['criteriaid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['contestantid']) && empty($data['contestantid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		if(isset($data['score']) && empty($data['score'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'End date is required'),JSON_PRETTY_PRINT);
		}
		ScoreModel::update($id,$data);
	}

	public static function delete($id){
		//ScoreModel::delete($id);
	}
}

?>