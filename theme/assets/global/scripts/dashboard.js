  		$(document).ready(function(){
  			reset();
  			$('#well-5').show();
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
    $('#dash-4').click(function(){
      reset();
      $('#well-4').show();
    });
    $('#dash-5').click(function(){
      reset();
      $('#well-5').show();
    });
		function reset(){
  			$('#well-1').hide();
  			$('#well-2').hide();
  			$('#well-3').hide();
        $('#well-4').hide();
        $('#well-5').hide();
  	}
    function remainPage(){
      reset();
      $('#well-1').show();
    }

    function logout(){
      sessionStorage['islogin'] = false;
      toastr.success('Success', 'youre loging of..');
      window.location = 'index.html';
    }

    $(document).ready(function(){
        $('#userlabel').html(sessionStorage['user']);
    });