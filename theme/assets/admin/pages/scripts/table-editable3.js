
$(document).ready(function() {
   loadeventtocombo3();
   getcontestant();
   loadcontdep();
   loadcontbyevnt();
});

var TableEditable3 = function () {

    var handleTable3 = function () {

       

        var table3 = $('#sample_editable_3');

        var oTable3 = table3.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            "pageLength": 10,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper3 = $("#sample_editable_3_wrapper");

        tableWrapper3.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select3 dropdown

        var nEditing3 = null;
        var nNew3 = false;

    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable3();
        }

    };

}();

//-------------------------------------------------------------------my code---------------------------------------------------------------


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
                loadcontbyevnt();
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#combo3eventt").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('error: ', error);
            toastr.error('Error', error);
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
                loadcontbyevnt();
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
            toastr.error('Error', error);
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
            toastr.error('Error', error);
            return;
        }
    });
}

function loadcontbyevntfiltered(id) {
    $("#sample_editable_3 tbody").html('');
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
                        var html ='<tr>\
                                        <td>' + row[i].contestantid + '</td>\
                                        <td>' + row[i].name + '</td>\
                                        <td>' + row[i].departmentname + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td><a data-id="'+row[i].contestantid+'" href="javascript:void(0)" data-toggle="modal" class="config contestanttmodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmcontestantdelet3('+row[i].contestantid+')" href="javascript:void(0)">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_3 tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
            toastr.error('Error', error);
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
        $("#contestantname").next('span').text('Contestant Name is required.');
        empty = true;
    }

    if ($('#contestantdep').val() == '') {
        $('#contestantdep').next('span').text('Contestant department is required.');
        empty = true;
    }
    
    if ($('#combo3eventt').val() == '') {
        $('#combo3eventt').next('span').text('event is required.');
        empty = true;
    }
   
    if ($('#tmp_pic4').val() == '') {
        $('#tmp_pic4').next('span').text('event is required.');
        empty = true;
    }

    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly.');
        return false;
    }

    $.ajax({
            url: '../server/contestants/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                contestantname: $('#contestantname').val(),
                departmentid: $('#contestantdep').val(),
                eventid:$('#combo3eventt').val(),
                photo:$('#tmp_pic4').val()
            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                    console.log('records save');
                    getcontestant();
                    toastr.success('Success', 'Records successfully saved!');
                    contclearfields();
                } else if (decode.success === false) {
                    console.log('failed saving records');
                    toastr.error('Error', 'Failed saving records');
                    return;
                }
            },
            error: function(error) {
                console.log("Error:");
                console.log(error.responseText);
                console.log(error.message);
                toastr.error('Error', error.message);
                return;
            }
    });
    
}

function getcontestant(){
    console.log('>loading data to contestants table..');
    $("#sample_editable_3 tbody").html('');
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
                         var html ='<tr>\
                                        <td>' + row[i].contestantid + '</td>\
                                        <td>' + row[i].name + '</td>\
                                        <td>' + row[i].departmentname + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td><a data-id="'+row[i].contestantid+'" href="javascript:void(0)" data-toggle="modal" class="config contestanttmodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmcontestantdelet3('+row[i].contestantid+')">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_3 tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
            toastr.error('Error', error.message);
            return;
        }
    });
}

function getcontestantbyid(id){
    console.log('>loading data to contestants table..');
    $("#sample_editable_3 tbody").html('');
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
                         var html ='<tr>\
                                        <td>' + row[i].contestantid + '</td>\
                                        <td>' + row[i].name + '</td>\
                                        <td>' + row[i].departmentname + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td><a data-id="'+row[i].contestantid+'" href="javascript:void(0)" data-toggle="modal" class="config contestanttmodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmcontestantdelet3('+row[i].contestantid+')">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_3 tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
            toastr.error('Error', error.message);
            return;
        }
    });
}

function confirmcontestantdelet3(id){
    if (confirm('delete this record?')) {
        deletecontestant(id);
    } else {
        
    }
}

function deletecontestant(id){
    $.ajax({
        url: '../server/contestants/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getcontestant();
                toastr.success('Success', 'Records successfully deleted');
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updatecontestant(id){
    console.log(id);
    console.log($('#contestantname_modal').val());
    console.log($('#contestantdep_modal').val());
    console.log($('#combo3eventt_modal').val());
    var empty = false;
    if ($("#contestantname_modal").val() == '') {
        $("#contestantname_modal").next('span').text('Contestant Name is required.');
        empty = true;
    }

    if ($('#contestantdep_modal').val() == '') {
        $('#contestantdep_modal').next('span').text('Contestant department is required.');
        empty = true;
    }
    
    if ($('#combo3eventt_modal').val() == '') {
        $('#combo3eventt_modal').next('span').text('event is required.');
        empty = true;
    }
    if ($('#contestantid_modal').val() == '') {
        $('#contestantid_modal').next('span').text('event is required.');
        empty = true;
    }

    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly.');
        return false;
    }

    $.ajax({
            url: '../server/contestants/'+id,
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                contestantname: $('#contestantname_modal').val(),
                departmentname: $('#contestantdep_modal').val(),
                eventname: $('#combo3eventt_modal').val(),
                contestantid: $('#contestantid_modal').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                   toastr.success('Success', 'Records successfully updated');
                   getcontestant();
                } else if (decode.success === false) {
                    toastr.error('Error', 'Failed saving records');
                    getcontestant();
                    return;
                }
            },
            error: function(error) {
                console.log("Error:");
                console.log(error.responseText);
                console.log(error.message);
                toastr.error('Error', error.responseText);
                return;
            }
        });
}

$(document).on("click", ".contestanttmodal", function() {
    var id = $(this).data('id'); console.log(id);
    getContestant_pushToMdal(id);
    $('#static3').modal('show');
});

function getContestant_pushToMdal(id) {
    $.ajax({
        url: '../server/contestants/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log(decode);
            if (decode) {
                var contestantid = decode.childs[0].contestantid;
                loadValuesToEventCombo_Modal();
                loadValuesToDepartmentCombo_Modal();
                $('#contestantname_modal').val(decode.childs[0].name);
                $('#contestantid_modal').val(contestantid);
            }
        },
        error: function(error) {
           toastr.error('error loading loading data to contestant modal!', error.responseText);
           console.log(error.responseText);
            return;
        }
    });
}

function loadValuesToEventCombo_Modal(){
    $("#combo3eventt_modal").html('');
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
                        var html = '<option value="'+row[i].eventname+'">'+row[i].eventname+'</option>';
                        $("#combo3eventt_modal").append(html);
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

function loadValuesToDepartmentCombo_Modal(){
    $("#contestantdep_modal").html('');
    $.ajax({
        url: '../server/departments/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response; 
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].departmentname+'">'+row[i].departmentname+'</option>';
                        $("#contestantdep_modal").append(html);
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