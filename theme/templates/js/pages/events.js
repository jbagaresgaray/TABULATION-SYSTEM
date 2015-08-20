
$(document).ready(function() {
    fetch_all_events();
    load_events_tocombo();
    load_events_tocombo2();
});
function hover(){
	load_events_tocombo();
    load_events_tocombo2();
}
function cleareventfields(){
	$('#eventdesc').val('');
	$('#eventname').val('');
}

function load_events_tocombo() {
    $("#allact_evnt").html('');
    console.log('>loading data to combo-1..');
    $.ajax({
        url: '../server/activities/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].actid+'">'+row[i].actname+'</option>';
                        $("#allact_evnt").append(html);
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
function load_events_tocombo2() {
    $("#allact_evnt2").html('');
    console.log('>loading data to combo-2..');
    $.ajax({
        url: '../server/activities/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].actid+'">'+row[i].actname+'</option>';
                        $("#allact_evnt2").append(html);
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
function saveEvent() {
    console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#allact_evnt2").val() == '') {
        $("#allact_evnt2").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#eventname').val() == '') {
        $('#eventname').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#eventdesc').val() == '') {
        $('#eventdesc').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#eventdate').val() == '') {
        $('#eventdate').next('span').text('Start date is required.');
        empty = true;
    }

    if (empty == true) {
        alert('Please input all the required fields correctly.', "error");
        return false;
    }

    $.ajax({
            url: '../server/events/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                eventname: $('#eventname').val(),
                eventdescription: $('#eventdesc').val(),
                eventdate:$('#eventdate').val(),
                actid:$('#allact_evnt2').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                	console.log('records save');
                    alert("records successfully saved!");
                    fetch_all_events();
    				cleareventfields();
                    //loadeventtocombo3();
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
                alert(error.responseText)
                return;
            }
    });
    
}

function fetch_all_events() {
	console.log('>loading data to event table..');
    $("#eventtable tbody").html('');
    $.ajax({
        url: '../server/events/',
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
                                        <td>'+row[i].eventid+'</td>\
                                        <td>'+row[i].eventname+'</td>\
                                        <td>'+row[i].eventdescription+'</td>\
                                        <td>'+row[i].eventdate+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a class="btn" href="#editactivity" data-toggle="modal"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmeventdelete('+row[i].eventid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#eventtable tbody").append(html);
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

function fetch_all_eventsbyID(id) {
	console.log('>loading data to event table..');
    $("#eventtable tbody").html('');
    $.ajax({
        url: '../server/events/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response; console.log(decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<tr>\
                                        <td>'+row[i].eventid+'</td>\
                                        <td>'+row[i].eventname+'</td>\
                                        <td>'+row[i].eventdescription+'</td>\
                                        <td>'+row[i].eventdate+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a class="btn" href="#editactivity" data-toggle="modal"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmeventdelete('+row[i].eventid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#eventtable tbody").append(html);
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

function confirmeventdelete(id){
    if (confirm('delete this record?')) {
        deleteevent(id);
    } else {
        
    }
}

function deleteevent(id){
    $("#eventtable tbody").html('');
    $.ajax({
        url: '../server/events/' + id,
        async: false,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                fetch_all_events();
            } else if (decode.success === false) {
                return;
            }

        }
    });
}
