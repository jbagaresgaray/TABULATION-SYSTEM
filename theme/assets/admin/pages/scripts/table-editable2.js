var TableEditable2 = function () {

    var handleTable2 = function () {

        function restoreRow2(oTable2, nRow2) {
            var aData2 = oTable2.fnGetData(nRow2);
            var jqTds2 = $('>td', nRow2);

            for (var i = 0, iLen = jqTds2.length; i < iLen; i++) {
                oTable2.fnUpdate(aData2[i], nRow2, i, false);
            }

            oTable2.fnDraw();
        }

        function editRow2(oTable2, nRow2) {
            var aData2 = oTable2.fnGetData(nRow2);
            var jqTds2 = $('>td', nRow2);
            jqTds2[0].innerHTML = '<input type="text" readonly class="form-control input-small" value="' + aData2[0] + '">';
            jqTds2[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData2[1] + '">';
            jqTds2[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData2[2] + '">';
            jqTds2[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData2[3] + '">';
            jqTds2[4].innerHTML = '<a class="edit2" href="">Save</a>';
            jqTds2[5].innerHTML = '<a class="cancel2" href="">Cancel</a>';
        }

        function saveRow2(oTable2, nRow2) {
            var jqInputs2 = $('input', nRow2);
            updateevent(jqInputs2);
            oTable2.fnUpdate(jqInputs2[0].value, nRow2, 0, false);
            oTable2.fnUpdate(jqInputs2[1].value, nRow2, 1, false);
            oTable2.fnUpdate(jqInputs2[2].value, nRow2, 2, false);
            oTable2.fnUpdate(jqInputs2[3].value, nRow2, 3, false);
            console.log(jqInputs2[0].value);
            
            oTable2.fnUpdate('<a class="edit2" href="">Edit</a>', nRow2, 4, false);
            oTable2.fnUpdate('<a class="delete2" href="">Delete</a>', nRow2, 5, false);
            oTable2.fnDraw();
        }

        function cancelEditRow2(oTable2, nRow2) {
            var jqInputs2 = $('input', nRow2);
            oTable2.fnUpdate(jqInputs2[0].value, nRow2, 0, false);
            oTable2.fnUpdate(jqInputs2[1].value, nRow2, 1, false);
            oTable2.fnUpdate(jqInputs2[2].value, nRow2, 2, false);
            oTable2.fnUpdate(jqInputs2[3].value, nRow2, 3, false);
            oTable2.fnUpdate('<a class="edit2" href="">Edit</a>', nRow2, 4, false);
            oTable2.fnDraw();
        }

        var table2 = $('#sample_editable_2');

        var oTable2 = table2.dataTable({

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

        var tableWrapper2 = $("#sample_editable_2_wrapper");

        tableWrapper2.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing2 = null;
        var nNew2 = false;

        $('#sample_editable_2_new').click(function (e) {
            e.preventDefault();

            if (nNew2 && nEditing2) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow2(oTable2, nEditing2); // save
                    $(nEditing2).find("td:first").html("Untitled");
                    nEditing2 = null;
                    nNew2 = false;

                } else {
                    oTable2.fnDeleteRow(nEditing2); // cancel
                    nEditing2 = null;
                    nNew2 = false;
                    
                    return;
                }
            }

            var aiNew = oTable2.fnAddData(['', '', '', '', '', '']);
            var nRow2 = oTable2.fnGetNodes(aiNew[0]);
            editRow2(oTable2, nRow2);
            nEditing2 = nRow2;
            nNew2 = true;
        });

        table2.on('click', '.delete2', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow2 = $(this).parents('tr')[0];
            oTable2.fnDeleteRow(nRow2);
        });

        table2.on('click', '.cancel2', function (e) {
            e.preventDefault();
            if (nNew2) {
                oTable2.fnDeleteRow(nEditing2);
                nEditing2 = null;
                nNew2 = false;
            } else {
                restoreRow2(oTable2, nEditing2);
                nEditing2 = null;
            }
        });

        table2.on('click', '.edit2', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow2 = $(this).parents('tr')[0];

            if (nEditing2 !== null && nEditing2 != nRow2) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow2(oTable2, nEditing2);
                editRow2(oTable2, nRow2);
                nEditing2 = nRow2;
            } else if (nEditing2 == nRow2 && this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                saveRow2(oTable2, nEditing2);
                nEditing2 = null;
            } else {
                /* No edit in progress - let's start one */
                editRow2(oTable2, nRow2);
                nEditing2 = nRow2;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable2();
        }

    };

}();


//-----------------------------------------------------x--------------------------------------------------------

$(document).ready(function() {
    fetch_all_events();
    load_events_tocombo1();
    load_events_tocombo2();
});

function load_events_tocombo1() {
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
            url: '../server/events/',
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
                } else if (decode.success === false) {
                    console.log('failed saving records');
                    toastr.error('Error', 'Failed inserting records!');
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

function fetch_all_events() {
    console.log('>loading data to event table..');
    $("#sample_editable_2 tbody").html('');
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
                                        <td>' + row[i].eventid + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td>' + row[i].eventdescription + '</td>\
                                        <td>' + row[i].eventdate + '</td>\
                                        <td><a class="edit2">Edit</a></td>\
                                        <td><a onClick="confirmeventdelete2('+row[i].eventid+')" class="delete2" href="">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_2 tbody").append(html);
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
    $("#sample_editable_2 tbody").html('');
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
                                        <td>' + row[i].eventid + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td>' + row[i].eventdescription + '</td>\
                                        <td>' + row[i].eventdate + '</td>\
                                        <td><a class="edit2" href="">Edit</a></td>\
                                        <td><a onClick="confirmeventdelete2('+row[i].eventid+')" class="delete2" href="">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_2 tbody").append(html);
                    }
                }
            }
        },
        error: function(error) {
            toastr.success('Error', error);
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
        url: '../server/events/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                fetch_all_events();
                load_events_tocombo1();
                load_events_tocombo2();
                toastr.success('Success', 'Records successfully deleted!');
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updateevent(obj){
    $.ajax({
            url: '../server/events/',
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                eventname: obj[1].value,
                eventdescription: obj[2].value,
                eventdate: obj[3].value,
                eventid:obj[0].value
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                     toastr.success('Success', 'Records successfully updated!');
                } else if (decode.success === false) {
                    toastr.error('Error', 'Failed updating records!');
                    return;
                }
            },
            error: function(error) {
                console.log("Error:");
                console.log(error.responseText);
                console.log(error.message);
                toastr.error('Success', error.message);
                return;
            }
        });
}

