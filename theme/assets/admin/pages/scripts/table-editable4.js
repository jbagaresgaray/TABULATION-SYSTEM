$(document).ready(function() {
    loadjudgecombo();
    getjudges();
});

var TableEditable4 = function () {

    var handleTable4 = function () {

        var table4 = $('#sample_editable_4');

        var oTable4 = table4.dataTable({

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

        var tableWrapper4 = $("#sample_editable_4_wrapper");

        tableWrapper4.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select3 dropdown

    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable4();
        }

    };

}();

//------------------------------------------------------------------my code---------------------------------------------------------------------

function clearjudgefields(){
    $("#judgefullname").val('');
    $("#judgeuname").val('');
    $("#judgepword").val('');
    $("#cjudgepword").val('');
}

function loadjudgecombo() {
    $("#judgecombo").html('');
    console.log('>loading data to combo-judge after clearing..');
    $.ajax({
        url: '../server/events/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-judge..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#judgecombo").append(html);
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

function saveJudge(){
    console.log('Saving records...');
    var empty = false;
    $('input[type="text"]').each(function() {
        $(this).val($(this).val().trim());
    });

    if ($("#judgefullname").val() == '') {
        $("#judgefullname").next('span').text('Fullname is required.');
        empty = true;
    }

    if ($('#judgeuname').val() == '') {
        $('#judgeuname').next('span').text('username is required.');
        empty = true;
    }
    if ($('#judgepword').val() == '') {
        $('#judgepword').next('span').text('password is required.');
        empty = true;
    }
    if ($('#cjudgepword').val() == '' || $('#cjudgepword').val() != $('#judgepword').val()) {
        $('#cjudgepword').next('span').text('password did not match');
        empty = true;
    }
    if ($('#judgecombo').val() == '') {
        $('#judgecombo').next('span').text('Start date is required.');
        empty = true;
    }
    if($('#cjudgepword').val() != $('#judgepword').val()){
        $('#cjudgepword').next('span').text('password did not match');
        toastr.error('Error', 'password did not match');
        empty = true;
    }
    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly');
        return false;
    }



    $.ajax({
            url: '../server/judges/',
            async: false,
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                judgefullname: $('#judgefullname').val(),
                judgeuname: $('#judgeuname').val(),
                judgepword:$('#judgepword').val(),
                eventid:$('#judgecombo').val()

            },
            success: function(response) {
                var decode = response;
                if (decode.success == true) {
                    console.log('records save');
                    getjudges();
                    toastr.success('Success', 'Records successfully inserted!');
                    clearjudgefields();
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

function getjudges() {
    console.log('>loading data to judge table..');
    $("#sample_editable_4 tbody").html('');
    $.ajax({
        url: '../server/judges/',
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
                                        <td style="display:none">' + row[i].judgeid + '</td>\
                                        <td>' + row[i].judgefullname + '</td>\
                                        <td>' + row[i].judgeuname + '</td>\
                                        <td>' + row[i].judgepword + '</td>\
                                        <td><a data-id="'+row[i].judgeid+'" href="javascript:void(0)" data-toggle="modal" class="config judgemodal" data-original-title="" title="">Edit</td>\
                                        <td><a onClick="confirmjudgedelete('+row[i].judgeid+')" href="javascript:void(0)">Delete</a></td>\
                                    </tr>';
                        $("#sample_editable_4 tbody").append(html);
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

function confirmjudgedelete(id){
    if (confirm('delete this record?')) {
        deletejudge(id);
    } else {
        
    }
}

function deletejudge(id){
    $.ajax({
        url: '../server/judges/' + id,
        async: true,
        type: 'DELETE',
        success: function(response) {
            var decode = response;
            if (decode.success == true) {
                getjudges();
                toastr.success('Success', 'Records successfully deleted!');
            } else if (decode.success === false) {
                return;
            }

        }
    });
}

function updatejudge(id){
    
    var empty = false;
    if ($("#judgefullname_modal").val() == '') {
        $("#judgefullname_modal").next('span').text('Activity Name is required.');
        empty = true;
    }

    if ($('#judgeuname_modal').val() == '') {
        $('#judgeuname_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#judgepword_modal').val() == '') {
        $('#judgepword_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#judgecombo_modal').val() == '') {
        $('#judgecombo_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if ($('#judgeid_modal').val() == '') {
        $('#judgeid_modal').next('span').text('Start date is required.');
        empty = true;
    }
    if($('#judgepword_modal').val() != $('#cjudgepword_modal').val()){
        $('#cjudgepword_modal').next('span').text('password did not match');
        toastr.error('Error', 'password did not match');
        empty = true;
    }
    if (empty == true) {
        toastr.error('Error', 'Please input all the required fields correctly');
        return false;
    }
    $.ajax({
            url: '../server/judges/'+id,
            async: false,
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                judgefullname: $("#judgefullname_modal").val(),
                judgeuname: $('#judgeuname_modal').val(),
                judgepword: $('#judgepword_modal').val(),
                judgeid: $('#judgeid_modal').val()
            },
            success: function(response) {
                var decode = response;

                if (decode.success == true) {
                   toastr.success('Success', 'Records successfuly updated');
                   getjudges();
                } else if (decode.success === false) {
                    toastr.error('Error', 'Failed updating records');
                    getjudges();
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

$(document).on("click", ".judgemodal", function() {
    var id = $(this).data('id'); console.log(id);
    getJudge_pushToMdal(id);
    $('#static4').modal('show');
});

function getJudge_pushToMdal(id) {
    $.ajax({
        url: '../server/judges/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                console.log(decode);
                loadValuesToJudgeCombo_Modal();
                $('#judgefullname_modal').val(decode.childs[0].judgefullname);
                $('#judgeuname_modal').val(decode.childs[0].judgeuname);
                $('#judgepword_modal').val(decode.childs[0].judgepword);
                $('#judgeid_modal').val(decode.childs[0].judgeid);
            }
        },
        error: function(error) {
           toastr.error('error loading activities!', error.responseText);
            return;
        }
    });
}

function loadValuesToJudgeCombo_Modal(){
    $("#judgecombo_modal").html('');
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
                        var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        $("#judgecombo_modal").append(html);
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

$(document).on("click", "#sample_editable_4_new", function() {
    $('#modalAdd4').modal('show');
});