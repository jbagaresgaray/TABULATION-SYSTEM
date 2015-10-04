<?php
include('../../server/reportsbyEvent/model.php');

class ReportsbyEventCtrl {
	
	public static function create($data){
	
	}

	public static function read(){
		ReportsbyEventModel::read();
	}

	public static function detail($id){
		ReportsbyEventModel::detail($id);
	}

	public static function update($id,$data){
		
	}

	public static function delete($id){
	
	}
}

?>