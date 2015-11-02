var TableEditable7 = function () {

    var handleTable7 = function () {

        var table7 = $('#sample_editable_7');

        var oTable7 = table7.dataTable({

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

        var tableWrapper7 = $("#sample_editable_7_wrapper");

        tableWrapper7.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select3 dropdown

    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable7();
        }

    };

}();

//---------------------------------------------------------------------------------------------
$(document).ready(function(){
    getDepartment();
});

function cleardepfields(){
    $("#departmentname").val('');
    $('#departmentdesc').val('');
}

function getDepartment() {
    console.log('>loading data to departments table..');
    $("#sample_editable_7 tbody").html('');
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
                        var html = '<tr>\
                                        <td style="display:none">' + row[i].departmentid + '</td>\
                                        <td>' + row[i].departmentname + '</td>\
                                        <td>' + row[i].departmentdesc + '</td>\
                                        <td><a data-id="'+row[i].departmentid+'" href="javascript:void(0)" data-toggle="modal" class="config departmentmodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmdepartmentdelete('+row[i].departmentid+')" href="javascript:void(0)">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_7 tbody").append(html);
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

function saveDepartment(){
    console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#departmentname").val() == '') {
        $("#departmentname").next('span').text('department Name is required.');
        empty = true;
    }

    if ($('#departmentdesc').val() == '') {
        $('#departmentdesc').next('span').text('department description is required.');
        empty = true;
    }

    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly.');
        return false;
    }

    $.ajax({
            url: '../server/departments/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                departmentname: $('#departmentname').val(),
                departmentdesc: $('#departmentdesc').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                    console.log('records save');
                    cleardepfields();
                    getDepartment();
                    loadcontdep(); //update selectbox of contestant modal
                    toastr.success('Success', 'Records successfully inserted!');
                } else if (decode.success === false) {
                    console.log('failed saving records');
                    toastr.error('Failed saving records!', decode.msg);
                    return;
                }
            },
            error: function(error) {
                toastr.error('Error', error.message);
                return;
            }
    });
}

function confirmdepartmentdelete(id){
    if (confirm('delete this record?')) {
        deletedepartment(id);
    } else {
        
    }
}

function deletedepartment(id){
    $.ajax({
        url: '../server/departments/index.php/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getDepartment();
                loadcontdep(); //update selectbox of contestant modal
                toastr.success('Success', 'Records successfully deleted!');
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updateDepartment(id){
    
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#departmentname_modal").val() == '') {
        $("#departmentname_modal").next('span').text('department Name is required.');
        empty = true;
    }

    if ($('#departmentdesc_modal').val() == '') {
        $('#departmentdesc_modal').next('span').text('department description is required.');
        empty = true;
    }

    if ($('#departmentid_modal').val() == '') {
        $('#departmentid_modal').next('span').text('department id is required.');
        empty = true;
    }

    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly.');
        return false;
    }
    $.ajax({
            url: '../server/departments/index.php/'+id,
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                departmentname: $('#departmentname_modal').val(),
                departmentdesc: $('#departmentdesc_modal').val(),
                departmentid: $('#departmentid_modal').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                  toastr.success('Success', 'Records successfully updated!');
                  getDepartment();
                  loadcontdep(); //update selectbox of contestant modal
                } else if (decode.success === false) {
                    toastr.error('Error', 'Failed updating records!');
                    return;
                }
            },
            error: function(error) {
                return;
            }
        });
}

$(document).on("click", ".departmentmodal", function() {
    var id = $(this).data('id'); 
    getDepartment_pushToMdal(id);
    $('#static7').modal('show');
});

function getDepartment_pushToMdal(id) {
    $.ajax({
        url: '../server/departments/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                var departmentid = decode.childs[0].departmentid;
                $('#departmentname_modal').val(decode.childs[0].departmentname);
                $('#departmentdesc_modal').val(decode.childs[0].departmentdesc);
                $('#departmentid_modal').val(departmentid);
            }
        },
        error: function(error) {
           toastr.error('error loading departments!', error.responseText);
            return;
        }
    });
}

$(document).on("click", "#sample_editable_7_new", function() {
    $('#modalAdd7').modal('show');
});