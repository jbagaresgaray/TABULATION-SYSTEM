$(document).ready(function() {
    loadjudgecombo();
    loadjudgecombo2();
    getjudges();
});

function clearjudgefields(){
	$("#judgefullname").val('');
	$("#judgeuname").val('');
	$("#judgepword").val('');
}

function loadjudgecombo() {
    $("#judgecombo").html('');
    console.log('>loading data to combo-judge after clearing..');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-judge..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#judgecombo").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('error: ', error);
            return;
        }
    });
}

function loadjudgecombo2() {
    $("#judgecombo2").html('');
    console.log('>loading data to combo-judge after clearing..');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-judge..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#judgecombo2").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('error: ', error);
            return;
        }
    });
}

function saveJudge(){
	console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#judgefullname").val() == '') {
        $("#judgefullname").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#judgeuname').val() == '') {
        $('#judgeuname').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#judgepword').val() == '') {
        $('#judgepword').next('span').text('Start date is required.');
        empty = true;
    }
	if ($('#judgecombo').val() == '') {
        $('#judgecombo').next('span').text('Start date is required.');
        empty = true;
    }
    if (empty == true) {
        alert('Please input all the required fields correctly.', "error");
        return false;
    }

    $.ajax({
            url: '../server/judges/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                judgefullname: $('#judgefullname').val(),
                judgeuname: $('#judgeuname').val(),
                judgepword:$('#judgepword').val(),
                eventid:$('#judgecombo').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                	console.log('records save');
                	getjudges();
                    alert("records successfully saved!");
                    clearjudgefields();
                } else if (decode.success === false) {
                	console.log('failed saving records');
                    alert("failed saving records!");
                    return;
                }
            },
            error: function(error) {
                console.log("Error:");
                console.log(error.responseText);
                console.log(error.message);
                alert(error.responseText);
                return;
            }
    });
}

function getjudges() {
	console.log('>loading data to judge table..');
    $("#judgetbl tbody").html('');
    $.ajax({
        url: '../server/judges/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<tr>\
                                        <td>'+row[i].judgeid+'</td>\
                                        <td>'+row[i].judgefullname+'</td>\
                                        <td>'+row[i].judgeuname+'</td>\
                                        <td>'+row[i].judgepword+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a class="btn" href="#editactivity" data-toggle="modal"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmjudgedelete('+row[i].judgeid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#judgetbl tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('error: ', error);
            return;
        }
    });
}

function getjudgesbyid(id) {
	console.log('>loading data to judge table..');
    $("#judgetbl tbody").html('');
    $.ajax({
        url: '../server/judges/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<tr>\
                                        <td>'+row[i].judgeid+'</td>\
                                        <td>'+row[i].judgefullname+'</td>\
                                        <td>'+row[i].judgeuname+'</td>\
                                        <td>'+row[i].judgepword+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a class="btn" href="#editactivity" data-toggle="modal"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmjudgedelete('+row[i].judgeid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#judgetbl tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('error: ', error);
            return;
        }
    });
}

function confirmjudgedelete(id){
    if (confirm('delete this record?')) {
        deletejudge(id);
    } else {
        
    }
}

function deletejudge(id){
    $("#judgetbl tbody").html('');
    $.ajax({
        url: '../server/judges/' + id,
        async: false,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getjudges();
            } else if (decode.success === false) {
                return;
            }

        }
    });
}