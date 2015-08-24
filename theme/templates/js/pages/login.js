function getuser(){
	console.log('hello',$("#username").val());
	var empty = false;
	var _username;
	var _password;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#username").val() == '') {
        $("#username").next('span').text('username is required.');
        empty = true;
        _username = $("#username").val();
    }

    if ($('#password').val() == '') {
        $('#password').next('span').text('password is required.');
        empty = true;
        _password = $('#password');
    }
    var data = [];

        $.ajax({
            url: '../server/finduser/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                username: $("#username").val(),
                password: $('#password').val()
            },
            success: function(response) {
                console.log(response.childs);
                console.log(response.childs[0].acctype);
                var type = response.childs[0].acctype;
                if(type='admin'){
                    console.log('admin form');
                    toastr.success('Success', 'Welcome Admin !');
                    sessionStorage['islogin'] = true;
                    sessionStorage['user'] = response.childs[0].username;
                    window.location = 'mainform.html';
                } else if(type='judge')  {
                    console.log('judge form');
                    toastr.success('Success', 'Welcome Judge !');
                    window.location = 'judgeform.html';
                }
            },
            error: function(error) {
                console.log("Error:",error);
                toastr.error('Error', error.message);
                return;
            }
        });
}