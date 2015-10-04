<?php
include('../../server/scores/model.php');

class ScoreCtrl {
	
	public static function create($data){
		if(isset($data['criteriaid']) && empty($data['criteriaid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'criteriaid is required'));
		}
		if(isset($data['contestantid']) && empty($data['contestantid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'contestantid is required'));
		}
		if(isset($data['scoring']) && empty($data['scoring'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'score is required'));
		}
		ScoreModel::create($data);
	}

	public static function read(){
		ScoreModel::read();
	}

	public static function detail($id){
		ScoreModel::detail($id);
	}

	public static function update($data){
		if(isset($data['criteriaid']) && empty($data['criteriaid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'criteriaid is required'));
		}
		if(isset($data['contestantid']) && empty($data['contestantid'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'contestantid is required'));
		}
		if(isset($data['scoring']) && empty($data['scoring'])){
			return print json_encode(array('success'=>false,'status'=>400,'msg'=>'score is required'));
		}else{
			ScoreModel::update($data);
		}
	}

	public static function delete($id){
		//ScoreModel::delete($id);
	}
}

?>