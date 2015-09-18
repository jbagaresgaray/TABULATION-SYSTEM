<?php
include('../../server/reports/model.php');

class ReportsCtrl {
	
	public static function create($data){
	
	}

	public static function read(){
		ReportsModel::read();
	}

	public static function detail($id){
		ReportsModel::detail($id);
	}

	public static function update($id,$data){
		
	}

	public static function delete($id){
	
	}
}

?>