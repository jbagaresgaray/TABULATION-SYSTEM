  		$(document).ready(function(){
  			reset();
  			$('#well-1').show();
  		});
  		
  		$('#dash-1').click(function(){
  			reset();
  			$('#well-1').show();
  		});
		$('#dash-2').click(function(){
			reset();
			$('#well-2').show();
		});
		$('#dash-3').click(function(){
			reset();
			$('#well-3').show();
		});
		function reset(){
  			$('#well-1').hide();
  			$('#well-2').hide();
  			$('#well-3').hide();
  		}