var TableEditable4 = function () {

    var handleTable4 = function () {

        function restoreRow4(oTable4, nRow4) {
            var aData4 = oTable4.fnGetData(nRow4);
            var jqTds4 = $('>td', nRow4);

            for (var i = 0, iLen = jqTds4.length; i < iLen; i++) {
                oTable4.fnUpdate(aData4[i], nRow4, i, false);
            }

            oTable4.fnDraw();
        }

        function editRow4(oTable4, nRow4) {
            var aData4 = oTable4.fnGetData(nRow4);
            var jqTds4 = $('>td', nRow4);
            jqTds4[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData4[0] + '">';
            jqTds4[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData4[1] + '">';
            jqTds4[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData4[2] + '">';
            jqTds4[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData4[3] + '">';
            jqTds4[4].innerHTML = '<a class="edit4" href="">Save</a>';
            jqTds4[5].innerHTML = '<a class="cancel4" href="">Cancel</a>';
        }

        function saveRow4(oTable4, nRow4) {
            var jqInputs4 = $('input', nRow4);
            oTable4.fnUpdate(jqInputs4[0].value, nRow4, 0, false);
            oTable4.fnUpdate(jqInputs4[1].value, nRow4, 1, false);
            oTable4.fnUpdate(jqInputs4[2].value, nRow4, 2, false);
            oTable4.fnUpdate(jqInputs4[3].value, nRow4, 3, false);
            console.log(jqInputs4[0].value);
            
            oTable4.fnUpdate('<a class="edit4" href="">Edit</a>', nRow4, 4, false);
            oTable4.fnUpdate('<a class="delete4" href="">Delete</a>', nRow4, 5, false);
            oTable4.fnDraw();
        }

        function cancelEditRow4(oTable4, nRow4) {
            var jqInputs4 = $('input', nRow4);
            oTable4.fnUpdate(jqInputs4[0].value, nRow4, 0, false);
            oTable4.fnUpdate(jqInputs4[1].value, nRow4, 1, false);
            oTable4.fnUpdate(jqInputs4[2].value, nRow4, 2, false);
            oTable4.fnUpdate(jqInputs4[3].value, nRow4, 3, false);
            oTable4.fnUpdate('<a class="edit4" href="">Edit</a>', nRow4, 4, false);
            oTable4.fnDraw();
        }

        var table4 = $('#sample_editable_4');

        var oTable4 = table4.dataTable({

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

        var tableWrapper4 = $("#sample_editable_4_wrapper");

        tableWrapper4.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select3 dropdown

        var nEditing4 = null;
        var nNew4 = false;

        $('#sample_editable_4_new').click(function (e) {
            e.preventDefault();

            if (nNew4 && nEditing4) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow4(oTable4, nEditing4); // save
                    $(nEditing4).find("td:first").html("Untitled");
                    nEditing4 = null;
                    nNew4 = false;

                } else {
                    oTable4.fnDeleteRow(nEditing4); // cancel
                    nEditing4 = null;
                    nNew4 = false;
                    
                    return;
                }
            }

            var aiNew = oTable4.fnAddData(['', '', '', '', '', '']);
            var nRow4 = oTable4.fnGetNodes(aiNew[0]);
            editRow4(oTable4, nRow4);
            nEditing4 = nRow4;
            nNew4 = true;
        });

        table4.on('click', '.delete4', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow4 = $(this).parents('tr')[0];
            oTable4.fnDeleteRow(nRow4);
            alert("Deleted! Do not forget to do some ajax to sync with backend :)");
        });

        table4.on('click', '.cancel4', function (e) {
            e.preventDefault();
            if (nNew4) {
                oTable4.fnDeleteRow(nEditing4);
                nEditing4 = null;
                nNew4 = false;
            } else {
                restoreRow4(oTable4, nEditing4);
                nEditing4 = null;
            }
        });

        table4.on('click', '.edit4', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow4 = $(this).parents('tr')[0];

            if (nEditing4 !== null && nEditing4 != nRow4) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow4(oTable4, nEditing4);
                editRow4(oTable4, nRow4);
                nEditing4 = nRow4;
            } else if (nEditing4 == nRow4 && this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                saveRow4(oTable4, nEditing4);
                nEditing4 = null;
                alert("Updated! Do not forget to do some ajax to sync with backend :)");
            } else {
                /* No edit in progress - let's start one */
                editRow4(oTable4, nRow4);
                nEditing4 = nRow4;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable4();
        }

    };

}();