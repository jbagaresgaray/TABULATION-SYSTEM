
$(document).ready(function() {
   loadeventtocombo3();
   getcontestant();
   loadcontdep();
   loadcontbyevnt();
});

var TableEditable3 = function () {

    var handleTable3 = function () {

        function restoreRow3(oTable3, nRow3) {
            var aData3 = oTable3.fnGetData(nRow3);
            var jqTds3 = $('>td', nRow3);

            for (var i = 0, iLen = jqTds3.length; i < iLen; i++) {
                oTable3.fnUpdate(aData3[i], nRow3, i, false);
            }

            oTable3.fnDraw();
        }

        function editRow3(oTable3, nRow3) {
            var aData3 = oTable3.fnGetData(nRow3);
            var jqTds3 = $('>td', nRow3);
            jqTds3[0].innerHTML = '<input type="text" readonly class="form-control input-small" value="' + aData3[0] + '">';
            jqTds3[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData3[1] + '">';
            jqTds3[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData3[2] + '">';
            jqTds3[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData3[3] + '">';
            jqTds3[4].innerHTML = '<a class="edit3" href="">Save</a>';
            jqTds3[5].innerHTML = '<a class="cancel3" href="">Cancel</a>';
        }

        function saveRow3(oTable3, nRow3) {
            var jqInputs3 = $('input', nRow3);
            updatecontestant(jqInputs3);
            oTable3.fnUpdate(jqInputs3[0].value, nRow3, 0, false);
            oTable3.fnUpdate(jqInputs3[1].value, nRow3, 1, false);
            oTable3.fnUpdate(jqInputs3[2].value, nRow3, 2, false);
            oTable3.fnUpdate(jqInputs3[3].value, nRow3, 3, false);
            oTable3.fnUpdate('<a class="edit3" href="">Edit</a>', nRow3, 4, false);
            oTable3.fnUpdate('<a class="delete3" href="">Delete</a>', nRow3, 5, false);
            oTable3.fnDraw();
        }

        function cancelEditRow3(oTable3, nRow3) {
            var jqInputs3 = $('input', nRow3);
            oTable3.fnUpdate(jqInputs3[0].value, nRow3, 0, false);
            oTable3.fnUpdate(jqInputs3[1].value, nRow3, 1, false);
            oTable3.fnUpdate(jqInputs3[2].value, nRow3, 2, false);
            oTable3.fnUpdate(jqInputs3[3].value, nRow3, 3, false);
            oTable3.fnUpdate('<a class="edit3" href="">Edit</a>', nRow3, 4, false);
            oTable3.fnDraw();
        }

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

        $('#sample_editable_3_new').click(function (e) {
            e.preventDefault();

            if (nNew3 && nEditing3) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow3(oTable3, nEditing3); // save
                    $(nEditing3).find("td:first").html("Untitled");
                    nEditing3 = null;
                    nNew3 = false;

                } else {
                    oTable3.fnDeleteRow(nEditing3); // cancel
                    nEditing3 = null;
                    nNew3 = false;
                    
                    return;
                }
            }

            var aiNew = oTable3.fnAddData(['', '', '', '', '', '']);
            var nRow3 = oTable3.fnGetNodes(aiNew[0]);
            editRow3(oTable3, nRow3);
            nEditing3 = nRow3;
            nNew3 = true;
        });

        table3.on('click', '.delete3', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow3 = $(this).parents('tr')[0];
            oTable3.fnDeleteRow(nRow3);
        });

        table3.on('click', '.cancel3', function (e) {
            e.preventDefault();
            if (nNew3) {
                oTable3.fnDeleteRow(nEditing3);
                nEditing3 = null;
                nNew3 = false;
            } else {
                restoreRow3(oTable3, nEditing3);
                nEditing3 = null;
            }
        });

        table3.on('click', '.edit3', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow3 = $(this).parents('tr')[0];

            if (nEditing3 !== null && nEditing3 != nRow3) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow3(oTable3, nEditing3);
                editRow3(oTable3, nRow3);
                nEditing3 = nRow3;
            } else if (nEditing3 == nRow3 && this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                saveRow3(oTable3, nEditing3);
                nEditing3 = null;
            } else {
                /* No edit in progress - let's start one */
                editRow3(oTable3, nRow3);
                nEditing3 = nRow3;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable3();
        }

    };

}();

//-------------------------------------------------------------------x---------------------------------------------------------------


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
                                        <td><a class="edit3">Edit</a></td>\
                                        <td><a onClick="confirmcontestantdelet3('+row[i].contestantid+')" class="delete3" href="">Delete</a></td>\
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
                eventid:$('#combo3eventt').val()

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
                                        <td><a class="edit3">Edit</a></td>\
                                        <td><a onClick="confirmcontestantdelet3('+row[i].contestantid+')" class="delete3" href="">Delete</a></td>\
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
                                        <td><a class="edit3">Edit</a></td>\
                                        <td><a onClick="confirmcontestantdelet3('+row[i].contestantid+')" class="delete3" href="">Delete</a></td>\
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

function updatecontestant(obj){
    $.ajax({
            url: '../server/contestants/',
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                contestantname: obj[1].value,
                departmentname: obj[2].value,
                eventname: obj[3].value,
                contestantid:obj[0].value
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