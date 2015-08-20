var offset = 1;
var le = 20;

$(document).ready(function() {
    fetch_all_activities();
    var currentuser = sessionStorage['user'];
    console.log('>currentuser is ',currentuser);
    $('#userlabel').html(currentuser);
});

function reset(){
    $('#actname').val('');
}

function save() {
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#actname").val() == '') {
        $("#actname").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#startdate').val() == '') {
        $('#startdate').next('span').text('Start date is required.');
        empty = true;
    }

    if ($('#enddate').val() == '') {
        $('#enddate').next('span').text('End date is required.');
        empty = true;
    }

    if (empty == true) {
        alert('Please input all the required fields correctly.', "error");
        return false;
    }

    $.ajax({
            url: '../server/activities/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                actname: $('#actname').val(),
                actstartdate: $('#startdate').val(),
                actenddate: $('#enddate').val(),
                userid:1
            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                     alert("records successfully saved!");
                     fetch_all_activities();
                     fetch_all_events();
                     reset();
                } else if (decode.success === false) {
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

function confirmdelete(id){
    if (confirm('delete this record?')) {
        deleteactivity(id);
    } else {
        
    }
    /*BootstrapDialog.confirm('Hi Apple, are you sure?', function(result){
            if(result) {
                deleteactivity(id);
            }else {
                alert('Nope.');
            }
    });*/
}
function deleteactivity(id){
    $("#acttable tbody").html('');
    $.ajax({
        url: '../server/activities/' + id,
        async: false,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                fetch_all_activities();
            } else if (decode.success === false) {
                return;
            }

        }
    });
}
function nextpage(){
    offset += 7;
    $('#pagelimit').html(offset);
}
function prevpage(){
    if(offset<=7){

    }
    else{
        offset -= 7;
        $('#pagelimit').html(offset);
    }

}

function fetch_all_activities() {
    $("#acttable tbody").html('');
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
                        var html = '<tr>\
                                        <td>'+row[i].actid+'</td>\
                                        <td>'+row[i].actname+'</td>\
                                        <td>'+row[i].actstartdate+'</td>\
                                        <td>'+row[i].actenddate+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a id="mactx" data-id="'+ row[i].actid +'" class="btn edit-icon" href="#"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmdelete('+row[i].actid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#acttable tbody").append(html);
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
function updateactivity(){
    $.ajax({
            url: '../server/activities/' + $('#act_id').val(),
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                actname: $('#actname').val(),
                actstartdate: $('#startdate').val(),
                actenddate: $('#enddate').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                   alert(decode);
                } else if (decode.success === false) {
                    
                    return;
                }
            },
            error: function(error) {
                console.log("Error:");
                console.log(error.responseText);
                console.log(error.message);
                return;
            }
        });
}


// $(document).on('click', $('#mactx'), function() {
//     var id = $('#mactx').data('id');
//     console.log(id);
//     getactivitybyidandloadtomodal(id);
//     $('#editactivity').modal();
// });

// function getactivitybyidandloadtomodal(id) {
//     $.ajax({
//         url: '../server/activities/'+id,
//         async: false,
//         type: 'GET',
//         dataType: 'json',
//         success: function(response) {
//             var decode = response;
//             console.log(decode);
//             if (decode) {
//                 $('#m-actname').val(decode.childs[0].actname);
//                 $('#m-actstartdate').val(decode.childs[0].actstartdate);
//                 $('#m-actsenddate').val(decode.childs[0].actenddate);
                
//             }
//         },
//         error: function(error) {
//             console.log('error: ', error);
//             return;
//         }
//     });
// }