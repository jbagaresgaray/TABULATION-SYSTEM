$(document).ready(function() {
   fetch_all_activities();
});

var TableEditable = function () {

    var handleTable = function () {

        var table = $('#sample_editable_1');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [-1, 5, 15, 20],
                ["All", 5, 15, 20] // change per page values here
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

        var tableWrapper = $("#sample_editable_1_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();

//-----------------------------------------------------------------------my code-------------------------------------------------------

/*function saveToctivities(){
    $('#btn-act').button('loading');
    save();
    $('#btn-act').button('reset');
}*/


function save() {
    $('#btn-act').button('loading');
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
        toastr.error('Please input all the required fields correctly.', 'error!');
        return false;
    }
    
    $.ajax({
            url: '../server/activities/index.php',
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
                     toastr.success('Server response', 'Records successfully saved!');
                     fetch_all_activities();
                     load_events_tocombo1();
                     $('#actname').val('');
                     $('#startdate').val('');
                     $('#enddate').val('')
                     //reset();
                } else if (decode.success === false) {
                    toastr.error('failed saving records!', decode.msg);
                } 
            },
            error: function(error) {
                toastr.error('Server responds!', error.responseText);
                return;
            }
    
    });
}

function fetch_all_activities() {
    $("#sample_editable_1 tbody").html('');
    $.ajax({
        url: '../server/activities/index.php',
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
                                        <td style="display:none">' + row[i].actid + '</td>\
                                        <td>' + row[i].actname + '</td>\
                                        <td>' + row[i].actstartdate + '</td>\
                                        <td>' + row[i].actenddate + '</td>\
                                        <td><a data-id="'+row[i].actid+'" href="javascript:void(0)" data-toggle="modal" class="config activitymodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmdelete('+row[i].actid+')" href="javascript:void(0)">Delete</a></td>\
                                    </tr>';

                        $("#sample_editable_1 tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
           toastr.error('error loading activities!', error.responseText);
            return;
        }
    });
}

function reset(){
    $('#actname').val('');
}

function confirmdelete(id){
    if (confirm('delete this record?')) {
        deleteactivity(id);
    } else {
    }  
}

function deleteactivity(id){
    $.ajax({
        url: '../server/activities/index.php/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                toastr.success('Server response', 'Records successfully deleted!');
                fetch_all_activities();
                load_events_tocombo1();
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updateactivity(obj){
    var empty = false;
    if ($("#actname_modal").val() == '') {
        $("#actname_modal").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#startdate_modal').val() == '') {
        $('#startdate_modal').next('span').text('Start date is required.');
        empty = true;
    }

    if ($('#enddate_modal').val() == '') {
        $('#enddate_modal').next('span').text('End date is required.');
        empty = true;
    }
    if ($('#actid_modal').val() == '') {
        $('#actid_modal').next('span').text('End date is required.');
        empty = true;
    }

    if (empty == true) {
        toastr.error('Please input all the required fields correctly.', 'error!');
        return false;
    }
    $.ajax({
            url: '../server/activities/index.php',
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                actname: $('#actname_modal').val(),
                actstartdate: $('#startdate_modal').val(),
                actenddate: $('#enddate_modal').val(),
                actid:  $('#actid_modal').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                  toastr.success('Server response', 'Records successfully updated!');
                  fetch_all_activities();
                  load_events_tocombo1();
                } else if (decode.success === false) {
                    alert(decode);
                    return;
                }
            },
            error: function(error) {
                toastr.error('error updating activities!', error.responseText);
                return;
            }
        });
}

$(document).on("click", ".activitymodal", function() {
    var id = $(this).data('id');
    getActivities_pushToModal(id);
    $('#static1').modal('show');
});

function getActivities_pushToModal(id) {
    $.ajax({
        url: '../server/activities/index.php/'+id, 
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                $('#actname_modal').val(decode.childs[0].actname);
                $('#startdate_modal').val(decode.childs[0].actstartdate);
                $('#enddate_modal').val(decode.childs[0].actenddate);
                $('#actid_modal').val(decode.childs[0].actid);
            }
        },
        error: function(error) {
           toastr.error('error loading activities!', error.responseText);
            return;
        }
    });
}

$(document).on("click", "#sample_editable_1_new", function() {
    $('#modalAdd1').modal('show');
});