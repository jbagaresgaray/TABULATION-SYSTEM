
$(document).ready(function() {
   console.log('loading combo 3..');
   loadeventtocombo3();
   getcontestant();
   loadcontdep();
   loadcontbyevnt();
});

function contclearfields(){
    $('#contestantname').val('');
}

function loadeventtocombo3() {
    $("#combo3eventt").html('');
    console.log('>loading data to combo-3 after clearing..');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-3..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option id="x" value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#combo3eventt").append(html);
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

function loadcontdep() {
    $("#contestantdep").html('');
    console.log('>loading data to contestantdep after clearing..');
    $.ajax({
        url: '../server/departments/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to contestantdep..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].departmentid+'">'+row[i].departmentname+'</option>';
                        console.log('>metadata',row[i].departmentid+' '+row[i].departmentname);
                        $("#contestantdep").append(html);
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

function loadcontbyevnt() {
    $("#contestantdep2").html('');
    console.log('>loading data to contestantdep after clearing..');
    $.ajax({
        url: '../server/filtercontestants/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to contestantdep..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#contestantdep2").append(html);
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

function loadcontbyevntfiltered(id) {
    $("#contestanttable tbody").html('');
    console.log('>loading data to contestanttable after clearing..');
    $.ajax({
        url: '../server/filtercontestants/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to contestanttable..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<tr>\
                                        <td>'+row[i].contestantid+'</td>\
                                        <td>'+row[i].name+'</td>\
                                        <td>'+row[i].departmentname+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a id="mevtx" data-id="'+ row[i].contestantid +'" class="btn edit-icon" href="#"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmcontestantdelete('+row[i].contestantid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#contestanttable tbody").append(html);
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

function saveContestant() {
    console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#contestantname").val() == '') {
        $("#contestantname").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#contestantdep').val() == '') {
        $('#contestantdep').next('span').text('Start date is required.');
        empty = true;
    }
    
    if ($('#combo3eventt').val() == '') {
        $('#combo3eventt').next('span').text('Start date is required.');
        empty = true;
    }

    if (empty == true) {
        alert('Please input all the required fields correctly.', "error");
        return false;
    }
    console.log($("#contestantname").val());
    console.log($("#contestantdep").val());
    console.log($("#combo3eventt").val());

    $.ajax({
            url: '../server/contestants/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                contestantname: $('#contestantname').val(),
                departmentid: $('#contestantdep').val(),
                eventid:$('#combo3eventt').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                    console.log('records save');
                    getcontestant();
                    alert("records successfully saved!");
                    contclearfields();
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

function getcontestant(){
    console.log('>loading data to contestants table..');
    $("#contestanttable tbody").html('');
    $.ajax({
        url: '../server/contestants/',
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
                                        <td>'+row[i].contestantid+'</td>\
                                        <td>'+row[i].name+'</td>\
                                        <td>'+row[i].departmentname+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                               <a id="mevtx" data-id="'+ row[i].contestantid +'" class="btn edit-icon" href="#"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmcontestantdelete('+row[i].contestantid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#contestanttable tbody").append(html);
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

function getcontestantbyid(id){
    console.log('>loading data to contestants table..');
    $("#contestanttable tbody").html('');
    $.ajax({
        url: '../server/contestants/'+id,
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
                                        <td>'+row[i].contestantid+'</td>\
                                        <td>'+row[i].name+'</td>\
                                        <td>'+row[i].departmentname+'</td>\
                                        <td><span class="label label-important">End</span></td>\
                                        <td>\
                                            <div class="btn-group">\
                                                <a id="mevtx" data-id="'+ row[i].contestantid +'" class="btn edit-icon" href="#"><i class="icon-edit"></i></a>\
                                            </div>\
                                            <div class="btn-group">\
                                                <a class="btn" onClick="confirmcontestantdelete('+row[i].contestantid+')"><i class="icon-trash"></i></a>\
                                            </div>\
                                        </td>\
                                    </tr>';
                        $("#contestanttable tbody").append(html);
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

function confirmcontestantdelete(id){
    if (confirm('delete this record?')) {
        deletecontestant(id);
    } else {
        
    }
}

function deletecontestant(id){
    $("#contestanttable tbody").html('');
    $.ajax({
        url: '../server/contestants/' + id,
        async: false,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getcontestant();
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

/*$(document).on('click', $('#mevtx'), function() {
    var id = $('#mevtx').data('id');
    console.log(id);
    getcontestantsbyidandloadtomodal(id);
    $('#editcontestant').modal();
});

function getcontestantsbyidandloadtomodal(id) {
    $.ajax({
        url: '../server/contestants/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log(decode);
            if (decode) {
                $('#m-cntname').val(decode.childs[0].name);
                $('#m-cntdep').val(decode.childs[0].departmentname);
                
            }
        },
        error: function(error) {
            console.log('error: ', error);
            return;
        }
    });
}*/