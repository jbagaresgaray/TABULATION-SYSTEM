var TableEditable5 = function () {

    var handleTable5 = function () {

        function restoreRow5(oTable5, nRow5) {
            var aData5 = oTable5.fnGetData(nRow5);
            var jqTds5 = $('>td', nRow5);

            for (var i = 0, iLen = jqTds5.length; i < iLen; i++) {
                oTable5.fnUpdate(aData5[i], nRow5, i, false);
            }

            oTable5.fnDraw();
        }

        function editRow5(oTable5, nRow5) {
            var aData5 = oTable5.fnGetData(nRow5);
            var jqTds5 = $('>td', nRow5);
            jqTds5[0].innerHTML = '<input type="text" readonly class="form-control input-small" value="' + aData5[0] + '">';
            jqTds5[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData5[1] + '">';
            jqTds5[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData5[2] + '">';
            jqTds5[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData5[3] + '">';
            jqTds5[4].innerHTML = '<a class="edit5" href="">Save</a>';
            jqTds5[5].innerHTML = '<a class="cancel5" href="">Cancel</a>';
        }

        function saveRow5(oTable5, nRow5) {
            var jqInputs5 = $('input', nRow5);
            updatecriteria(jqInputs5);
            oTable5.fnUpdate(jqInputs5[0].value, nRow5, 0, false);
            oTable5.fnUpdate(jqInputs5[1].value, nRow5, 1, false);
            oTable5.fnUpdate(jqInputs5[2].value, nRow5, 2, false);
            oTable5.fnUpdate(jqInputs5[3].value, nRow5, 3, false);
            oTable5.fnUpdate('<a class="edit5" href="">Edit</a>', nRow5, 4, false);
            oTable5.fnUpdate('<a class="delete5" href="">Delete</a>', nRow5, 5, false);
            oTable5.fnDraw();
        }

        function cancelEditRow5(oTable5, nRow5) {
            var jqInputs5 = $('input', nRow5);
            oTable5.fnUpdate(jqInputs5[0].value, nRow5, 0, false);
            oTable5.fnUpdate(jqInputs5[1].value, nRow5, 1, false);
            oTable5.fnUpdate(jqInputs5[2].value, nRow5, 2, false);
            oTable5.fnUpdate(jqInputs5[3].value, nRow5, 3, false);
            oTable5.fnUpdate('<a class="edit5" href="">Edit</a>', nRow5, 4, false);
            oTable5.fnDraw();
        }

        var table5 = $('#sample_editable_5');

        var oTable5 = table5.dataTable({

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

        var tableWrapper5 = $("#sample_editable_5_wrapper");

        tableWrapper5.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select3 dropdown

        var nEditing5 = null;
        var nNew5 = false;

        $('#sample_editable_5_new').click(function (e) {
            e.preventDefault();

            if (nNew5 && nEditing5) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow5(oTable5, nEditing5); // save
                    $(nEditing5).find("td:first").html("Untitled");
                    nEditing5 = null;
                    nNew5 = false;

                } else {
                    oTable5.fnDeleteRow(nEditing5); // cancel
                    nEditing5 = null;
                    nNew5 = false;
                    
                    return;
                }
            }

            var aiNew = oTable5.fnAddData(['', '', '', '', '', '']);
            var nRow5 = oTable5.fnGetNodes(aiNew[0]);
            editRow5(oTable5, nRow5);
            nEditing5 = nRow5;
            nNew5 = true;
        });

        table5.on('click', '.delete5', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow5 = $(this).parents('tr')[0];
            oTable5.fnDeleteRow(nRow5);
        });

        table5.on('click', '.cancel5', function (e) {
            e.preventDefault();
            if (nNew5) {
                oTable5.fnDeleteRow(nEditing5);
                nEditing5 = null;
                nNew5 = false;
            } else {
                restoreRow5(oTable5, nEditing5);
                nEditing5 = null;
            }
        });

        table5.on('click', '.edit5', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow5 = $(this).parents('tr')[0];

            if (nEditing5 !== null && nEditing5 != nRow5) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow5(oTable5, nEditing5);
                editRow5(oTable5, nRow5);
                nEditing5 = nRow5;
            } else if (nEditing5 == nRow5 && this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                saveRow5(oTable5, nEditing5);
                nEditing5 = null;
            } else {
                /* No edit in progress - let's start one */
                editRow5(oTable5, nRow5);
                nEditing5 = nRow5;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable5();
        }

    };

}();

//---------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function() {
    loadcriteriacombo();
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
            toastr.error('Error', error.message);
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
        toastr.error('Error', 'Please input all the required fields correctly.');
        return false;
    }

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
                    toastr.success('Success', 'Records successfully inserted!');
                    clearcriteriafields();
                } else if (decode.success === false) {
                    console.log('failed saving records');
                    toastr.error('Error', 'Failed saving records!');
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

function getCriteria() {
    console.log('>loading data to judge table..');
    $("#sample_editable_5 tbody").html('');
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
                                        <td>' + row[i].criteriaid + '</td>\
                                        <td>' + row[i].criterianame + '</td>\
                                        <td>' + row[i].percentage + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td><a class="edit5" href="">Edit</a></td>\
                                        <td><a onClick="confirmcriteriadelete('+row[i].criteriaid+')" class="delete5" href="">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_5 tbody").append(html);
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

function confirmcriteriadelete(id){
    if (confirm('delete this record?')) {
        deletecriteria(id);
    } else {
        
    }
}

function deletecriteria(id){
    $.ajax({
        url: '../server/criteria/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getCriteria();
                toastr.success('Success', 'Records successfully deleted!');
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updatecriteria(obj){
    $.ajax({
            url: '../server/criteria/',
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                criterianame: obj[1].value,
                percentage: obj[2].value,
                eventname: obj[3].value,
                criteriaid:obj[0].value
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
                return;
            }
        });
}