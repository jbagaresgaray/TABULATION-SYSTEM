$(document).ready(function(){

    loadeventsToscoreCombo();
    loadacivitiesToCombo();
    loadReportsByEventId($('#eventcombo4score').val());
    loadEventReportsByEventId($('#actcombo4score').val());
});

//----------------------------------------------------------------- R E P O R T S   1 ------------------------------------------------->

function loadeventsToscoreCombo(){
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
                        $("#eventcombo4score").append(html);
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

function loadReportsByEventId(id){
   
    $("#reports1 tbody").html('');
    $.ajax({
        url: '../server/scores/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var criteriaid = row[i].criteriaid.toString();
                        var criterianame = row[i].criterianame;
                        x(criteriaid,criterianame);
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

function x(id,name){
    console.log(id+'-'+name);
    $.ajax({
        url: '../server/reports/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var contestantname = row[i].name;
                        var departmentname = row[i].departmentname;
                        var score = row[i].score;
                        var span = (i==0?'<td rowspan="'+decode.childs.length+'" style=""> '+name+' </td>':'');
                        var span2 = (i==0?'<td> <span class="label label-sm label-success"> Winner </span> </td>':'<td> <span class="label label-sm label-warning"> Rank-'+(i+1)+' </span> </td>');
                        var html = '<tr>\
                                        '+span+'\
                                        <td> '+contestantname+' </td>\
                                        <td> '+departmentname+' </td>\
                                        <td> '+score+'% </td>\
                                        '+span2+'\
                                    </tr>';

                        $("#reports1 tbody").append(html);
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

//----------------------------------------------------------------- R E P O R T S   2 ------------------------------------------------->

function loadacivitiesToCombo(){
    $.ajax({
        url: '../server/activities/',
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
                        var html = '<option value="'+row[i].actid+'">'+row[i].actname+'</option>';
                        $("#actcombo4score").append(html);
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

function loadEventReportsByEventId(id){
    console.log(id);
    $("#reports2 tbody").html('');
    $.ajax({
        url: '../server/events_ext1/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var eventid = row[i].eventid;
                        var eventname = row[i].eventname;
                        y(eventid,eventname);
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

function y(id,name){
    $.ajax({
        url: '../server/reportsbyEvent/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var contestantname = row[i].name;
                        var departmentname = row[i].departmentname;
                        var score = row[i].score;
                        var span = (i==0?'<td rowspan="'+decode.childs.length+'" style=""> '+name+' </td>':'');
                        var span2 = (i==0?'<td> <span class="label label-sm label-success"> Winner </span> </td>':'<td> <span class="label label-sm label-warning"> Rank-'+(i+1)+' </span> </td>');
                        var html = '<tr>\
                                        '+span+'\
                                        <td> '+contestantname+' </td>\
                                        <td> '+departmentname+' </td>\
                                        <td> '+score+'% </td>\
                                        '+span2+'\
                                    </tr>';

                        $("#reports2 tbody").append(html);
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