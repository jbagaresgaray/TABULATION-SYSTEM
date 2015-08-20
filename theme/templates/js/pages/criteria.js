$(document).ready(function() {
    loadcriteriacombo();
    loadcriteriacombo2();
    getCriteria();
});

function clearcriteriafields(){
	$("#criterianame").val('');
	$("#percentage").val('');
}

function loadcriteriacombo() {
    $("#eventidfrmcriteria").html('');
    console.log('>loading data to combo-criteria after clearing..');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-criteria..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#eventidfrmcriteria").append(html);
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

function loadcriteriacombo2() {
    $("#eventidfrmcriteriatbl").html('');
    console.log('>loading data to combo-criteria after clearing..');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-criteria..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#eventidfrmcriteriatbl").append(html);
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

function saveCriteria(){
	console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#criterianame").val() == '') {
        $("#criterianame").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#percentage').val() == '') {
        $('#percentage').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#eventidfrmcriteria').val() == '') {
        $('#eventidfrmcriteria').next('span').text('Start date is required.');
        empty = true;
    }
    if (empty == true) {
        alert('Please input all the required fields correctly.', "error");
        return false;
    }
    console.log($("#criterianame").val());
    console.log($("#percentage").val());
    console.log($("#eventidfrmcriteria").val());
    $.ajax({
            url: '../server/criteria/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                criterianame: $('#criterianame').val(),
                percentage: $('#percentage').val(),
                eventid:$('#eventidfrmcriteria').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                	console.log('records save');
                	getCriteria();
                    alert("records successfully saved!");
                    clearcriteriafields();
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

function getCriteria() {
	console.log('>loading data to judge table..');
    $("#criteriatbl tbody").html('');
    $.ajax({
        url: '../server/criteria/',
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
                                        <td>'+row[i].criteriaid+'</td>\
                                        <td>'+row[i].criterianame+'</td>\
                                        <td>'+row[i].percentage+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a class="btn" href="#editactivity" data-toggle="modal"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmcriteriadelete('+row[i].criteriaid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#criteriatbl tbody").append(html);
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

function getcriteriabyid(id) {
	console.log('>loading data to judge table..');
    $("#criteriatbl tbody").html('');
    $.ajax({
        url: '../server/criteria/'+id,
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
                                        <td>'+row[i].criteriaid+'</td>\
                                        <td>'+row[i].criterianame+'</td>\
                                        <td>'+row[i].percentage+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a class="btn" href="#editactivity" data-toggle="modal"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmcriteriadelete('+row[i].criteriaid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#criteriatbl tbody").append(html);
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

function confirmcriteriadelete(id){
    if (confirm('delete this record?')) {
        deletecriteria(id);
    } else {
        
    }
}

function deletecriteria(id){
    $("#criteriatbl tbody").html('');
    $.ajax({
        url: '../server/criteria/' + id,
        async: false,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getCriteria();
            } else if (decode.success === false) {
                return;
            }

        }
    });
}