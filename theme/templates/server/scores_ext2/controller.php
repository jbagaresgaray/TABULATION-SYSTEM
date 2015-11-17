<?php
include('../../server/scores_ext2/model.php');

class ScoreCtrl3 {
	
	public static function create($data){
		// if(isset($data['criteriaid']) && empty($data['criteriaid'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'criteriaid is required'));
		// }
		// if(isset($data['contestantid']) && empty($data['contestantid'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'contestantid is required'));
		// }
		// if(isset($data['scoring']) && empty($data['scoring'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'score is required'));
		// }
		// ScoreModel::create($data);
	}

	public static function read(){
		// ScoreModel::read();
	}

	public static function detail($id){
		ScoreModel3::detail($id);
	}

	public static function update($data){
		// if(isset($data['criteriaid']) && empty($data['criteriaid'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'criteriaid is required'));
		// }
		// if(isset($data['contestantid']) && empty($data['contestantid'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'contestantid is required'));
		// }
		// if(isset($data['scoring']) && empty($data['scoring'])){
		// 	return print json_encode(array('success'=>false,'status'=>400,'msg'=>'score is required'));
		// }else{
		// 	ScoreModel::update($data);
		// }
	}

	public static function delete($id){
		//ScoreModel::delete($id);
	}
}

?>