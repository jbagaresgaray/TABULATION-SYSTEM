$(document).ready(function() {
    fetch_all_events();
    load_events_tocombo1();
    load_events_tocombo2();
});

var TableEditable2 = function () {

    var handleTable2 = function () {

        var table2 = $('#sample_editable_2');

        var oTable2 = table2.dataTable({

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

        var tableWrapper2 = $("#sample_editable_2_wrapper");

        tableWrapper2.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable2();
        }

    };

}();


//-----------------------------------------------------my code--------------------------------------------------------

function load_events_tocombo1() {
    $("#allact_evnt").html('');
    console.log('>loading data to combo-1..');
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
    console.log('>loading data to combo-1..');
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

function cleareventfields(){
    $('#eventdesc').val('');
    $('#eventname').val('');
}

function saveEvent() {
    console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#allact_evnt").val() == '') {
        $("#allact_evnt").next('span').text('Activity Name is required.');
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
        toastr.error('Please input all the required fields correctly.', 'error!');
        return false;
    }

    $.ajax({
            url: '../server/events/index.php',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                eventname: $('#eventname').val(),
                eventdescription: $('#eventdesc').val(),
                eventdate:$('#eventdate').val(),
                actid:$('#allact_evnt').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                    console.log('records save');
                    toastr.success('Success', 'Records successfully inserted!');
                    fetch_all_events();  //reload events selectbox on tis page
                    cleareventfields();  //clear fields after saving
                    loadeventtocombo3(); //update events selectbox on contestant
                    loadjudgecombo();    //update events selectbox on judges
                    loadcriteriacombo(); //update events selectbox on critteria
                    $('#eventdate').val(''); //clear date field
                } else if (decode.success === false) {
                    console.log('failed saving records');
                    toastr.error('Failed inserting records!', decode.msg);
                    return;
                }
            },
            error: function(error) {
                toastr.error('Error', error.responseText);
                return;
            }
    });
    
}

function fetch_all_events() {
    console.log('>loading data to event table..');
    $("#sample_editable_2 tbody").html('');
    $.ajax({
        url: '../server/events/index.php',
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
                                        <td style="display:none">' + row[i].eventid + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td>' + row[i].eventdescription + '</td>\
                                        <td>' + row[i].eventdate + '</td>\
                                        <td><a data-id="'+row[i].eventid+'" href="javascript:void(0)" data-toggle="modal" class="config eventmodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmeventdelete2('+row[i].eventid+')" href="javascript:void(0)">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_2 tbody").append(html);
                    }
                }
                else {

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
    $("#sample_editable_2 tbody").html('');
    $.ajax({
        url: '../server/events_Ext1/index.php/'+id,
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
                                        <td style="display:none">' + row[i].eventid + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td>' + row[i].eventdescription + '</td>\
                                        <td>' + row[i].eventdate + '</td>\
                                        <td><a data-id="'+row[i].eventid+'" href="javascript:void(0)" data-toggle="modal" class="config eventmodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmeventdelete2('+row[i].eventid+')" href="javascript:void(0)">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_2 tbody").append(html);
                    }
                } else {
                    toastr.success('no records to display');
                }
            }
        },
        error: function(error) {
            toastr.error('Error', error);
            return;
        }
    });
}

function confirmeventdelete2(id){
    if (confirm('delete this record?')) {
        deleteevent(id);
    } else {
        
    }
}

function deleteevent(id){
   $.ajax({
        url: '../server/events/index.php/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                fetch_all_events();
                load_events_tocombo1();
                load_events_tocombo2();

                loadeventtocombo3(); //update events selectbox on contestant
                loadjudgecombo();    //update events selectbox on judges
                loadcriteriacombo(); //update events selectbox on critteria
                toastr.success('Success', 'Records successfully deleted!');
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updateevent(id){
    var empty = false;

    if ($("#eventname_modal").val() == '') {
        $("#eventname_modal").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#eventdesc_modal').val() == '') {
        $('#eventdesc_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#eventdate_modal').val() == '') {
        $('#eventdate_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#eventid_modal').val() == '') {
        $('#eventid_modal').next('span').text('Start date is required.');
        empty = true;
    }

    if (empty == true) {
        toastr.error('Please input all the required fields correctly.', 'error!');
        return false;
    }

    $.ajax({
            url: '../server/events/index.php',
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                eventname: $('#eventname_modal').val(),
                eventdescription: $('#eventdesc_modal').val(),
                eventdate: $('#eventdate_modal').val(),
                eventid: $('#eventid_modal').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                     toastr.success('Success', 'Records successfully updated!');
                     fetch_all_events();
                     loadeventtocombo3(); //update events selectbox on contestant
                     loadjudgecombo();    //update events selectbox on judges
                     loadcriteriacombo(); //update events selectbox on critteria
                } else if (decode.success === false) {
                    toastr.error('Error', 'Failed updating records!');
                    return;
                }
            },
            error: function(error) {
                toastr.error('Success', error.message);
                return;
            }
        });
}

$(document).on("click", ".eventmodal", function() {
    var id = $(this).data('id');
    getEvents_pushToMdal(id);
    $('#static2').modal('show');
});

function getEvents_pushToMdal(id) {
    $.ajax({
        url: '../server/events/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                var actid = decode.childs[0].actid;
                loadValuesToEventCombo_Mdal();
                $('#eventname_modal').val(decode.childs[0].eventname);
                $('#eventdesc_modal').val(decode.childs[0].eventdescription);
                $('#eventdate_modal').val(decode.childs[0].eventdate);
                $('#eventid_modal').val(decode.childs[0].eventid);
            }
        },
        error: function(error) {
           toastr.error('error loading activities!', error.responseText);
            return;
        }
    });
}

function loadValuesToEventCombo_Mdal(){
    $("#allact_evnt_modal").html('');
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
                        var html = '<option value="'+row[i].actid+'">'+row[i].actname+'</option>';
                        $("#allact_evnt_modal").append(html);
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

$(document).on("click", "#sample_editable_2_new", function() {
    $('#modalAdd2').modal('show');
});