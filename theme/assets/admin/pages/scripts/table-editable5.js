$(document).ready(function() {
    loadcriteriacombo();
    getCriteria();
});

var TableEditable5 = function () {

    var handleTable5 = function () {

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

    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable5();
        }

    };

}();

//------------------------------------------------------------------my code---------------------------------------------------------------------------

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
                                        <td style="display:none">' + row[i].criteriaid + '</td>\
                                        <td>' + row[i].criterianame + '</td>\
                                        <td>' + row[i].percentage + '</td>\
                                        <td>' + row[i].eventname + '</td>\
                                        <td><a data-id="'+row[i].criteriaid+'" href="javascript:void(0)" data-toggle="modal" class="config criteriamodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmcriteriadelete('+row[i].criteriaid+')" href="javascript:void(0)">Delete</a></td>\
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

function updateCriteria(id){
    
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#criterianame_modal").val() == '') {
        $("#criterianame_modal").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#percentage_modal').val() == '') {
        $('#percentage_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#eventidfrmcriteria_modal').val() == '') {
        $('#eventidfrmcriteria_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#criteriaid_modal').val() == '') {
        $('#criteriaid_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly.');
        return false;
    }
    $.ajax({
            url: '../server/criteria/'+id,
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                criterianame: $('#criterianame_modal').val(),
                percentage: $('#percentage_modal').val(),
                eventname: $('#eventidfrmcriteria_modal').val(),
                criteriaid: $('#criteriaid_modal').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                  toastr.success('Success', 'Records successfully updated!');
                  getCriteria();
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

$(document).on("click", ".criteriamodal", function() {
    var id = $(this).data('id'); console.log(id);
    getCriteria_pushToMdal(id);
    $('#static5').modal('show');
});

function getCriteria_pushToMdal(id) {
    $.ajax({
        url: '../server/criteria/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
             console.log(decode);
            if (decode) {
                var criteriaid = decode.childs[0].criteriaid;
                loadValuesToCriteriaCombo_Modal();
                $('#criterianame_modal').val(decode.childs[0].criterianame);
                $('#percentage_modal').val(decode.childs[0].percentage);
                $('#criteriaid_modal').val(criteriaid);
            }
        },
        error: function(error) {
           toastr.error('error loading activities!', error.responseText);
            return;
        }
    });
}

function loadValuesToCriteriaCombo_Modal(){
    $("#eventidfrmcriteria_modal").html('');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response; 
            if (decode) {
                if (decode.childs.length > 0) {
                    console.log('toeventmodal',decode);
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventname+'">'+row[i].eventname+'</option>';
                        $("#eventidfrmcriteria_modal").append(html);
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