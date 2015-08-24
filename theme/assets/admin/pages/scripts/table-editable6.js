
$(document).ready(function(){
    loadeventsTojudgeCombo();
    loadcandidateTojudgeCombo();

    var eventid = $('#eventcombo4judge').val();
    loadCriteriaByEventId(eventid); //update table when combo event changed..

});

function loadeventsTojudgeCombo(){
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
                        $("#eventcombo4judge").append(html);
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

function loadcandidateTojudgeCombo(){
    $("#candidatecombo4judge").html('');
    $("#candidatecombo4judge").html('<option value=""></option>');
    console.log('>loading data to combo-judge after clearing..');
    $.ajax({
        url: '../server/contestants/',
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
                        var html = '<option value="'+row[i].contestantid+'">'+row[i].name+'</option>';
                        console.log('>metadata',row[i].contestantid+' '+row[i].name);
                        $("#candidatecombo4judge").append(html);
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

function loadContestantWhenEventComboChange(eventid){
    console.log(eventid);
    clear();
    $("#candidatecombo4judge").html('');
    console.log('>loading data to combo-judge after clearing..');
    $.ajax({
        url: '../server/contestants/'+eventid,
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
                        var html = '<option value="'+row[i].contestantid+'">'+row[i].name+'</option>';
                        console.log('>metadata',row[i].contestantid+' '+row[i].name);
                        $("#candidatecombo4judge").append(html);
                    }
                }
            }
        },
        error: function(error) {
            toastr.error('Error', error.message);
            return;
        }
    });
var eventid = $('#eventcombo4judge').val();
loadCriteriaByEventId(eventid); //update table when combo event changed..
}

function clear(){
    $('.candidatecombo4judge .select2-choice .select2-chosen').html('');
}

function loadCriteriaByEventId(id){
    console.log('here at loadCriteriaByEventId() fuction');
    var eventid = $('#eventcombo4judge').val();
    var defaultscore = 0;
    console.log('>loading data to judge table..');
    $("#sample_editable_6 tbody").html('');
    $.ajax({
        url: '../server/scores/'+id,
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
                        var rw = i.toString();
                        var x = 'i';
                        var r = [criteriaid + x + i];
                        var z = r.toString();
                        console.log(r);

                        var html = '<tr>\
                                        <td width="130px"><input id="criteriaid'+rw+'" readonly value="'+row[i].criteriaid+'" style="border: 0px;background-color: #FFFFFF;" type="label" class="form-control"></td>\
                                        <td>' + row[i].criterianame + '</td>\
                                        <td>' + row[i].percentage + '%</td>\
                                        <td width="50px"><input id="score'+rw+'" style="border: 1px dotted;background-color: #F4F7F7;" type="number" class="form-control" placeholder="'+defaultscore+'"></td>\
                                        <td width="150px" style="text-align:center"><a onclick=savescore('+rw+') class="edit6'+rw+'">Save</a>  |  <a class="cancel6">Cancel</a></td>\
                                    </tr>';

                        $("#sample_editable_6 tbody").append(html);
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

function savescore(fieldId){
    var action = $('.edit6'+fieldId).html();
    if(action=='Save'){
        //alert('save function here');
        //document.getElementById("score"+fieldId).readOnly = true;
        //$('.edit6'+fieldId).html('Update');
       
        var criteriaid = $('#criteriaid'+fieldId).val();
        var score = $('#score'+fieldId).val();
        var judgeid = 10;

        var empty = false;
        $('input[type="text"]').each(function() {
            $(this).val($(this).val().trim());
        });

        if ($('#eventcombo4judge').val() == '') {
            $('#eventcombo4judge').next('span').text('Start date is required.');
            empty = true;
        }

        if ($('#candidatecombo4judge').val() == '') {
            $('#candidatecombo4judge').next('span').text('End date is required.');
            empty = true;
        }
        if (score == '') {
            empty = true;
        }
        if (judgeid == '') {
            empty = true;
        }
        if (criteriaid == '') {
            empty = true;
        }

        if (empty == true) {
            toastr.error('Please input all the required fields correctly.', 'error!');
            return false;
        }
        console.log('eventid',$('#eventcombo4judge').val());
        console.log('judgeid',judgeid);
        console.log('criteriaid',criteriaid);
        console.log('contestantid',$('#candidatecombo4judge').val());
        console.log('score',score);
        $.ajax({
                url: '../server/scores/',
                async: false,
                type: 'POST',
                crossDomain: true,
                dataType: 'json',
                data: {
                    eventid: $('#eventcombo4judge').val(),
                    judgeid: judgeid,
                    criteriaid: criteriaid,
                    contestantid:$('#candidatecombo4judge').val(),
                    score:score
                },
                success: function(response) {
                    var decode = response;
                    if (decode.success == true) {
                         toastr.success('Server response', 'Records successfully saved!');
                         $('.edit6'+fieldId).html('Update');
                    } else if (decode.success === false) {
                        toastr.error('failed saving records!', 'error!');
                    } 
                },
                error: function(error) { 
                    console.log("Error:");
                    console.log(error.responseText);
                    console.log(error.message);
                    toastr.error('Server responds!', error.responseText);
                    return;
                }
        
        });
    }
    else if(action=='Update'){
        //alert('edit function here');
        //$('.edit6'+fieldId).html('Save');
        //document.getElementById("score"+fieldId).readOnly = false;

        var criteriaid = $('#criteriaid'+fieldId).val();
        var score = $('#score'+fieldId).val();
        var judgeid = 10;

        var empty = false;
        $('input[type="text"]').each(function() {
            $(this).val($(this).val().trim());
        });

        if ($('#eventcombo4judge').val() == '') {
            $('#eventcombo4judge').next('span').text('Start date is required.');
            empty = true;
        }

        if ($('#candidatecombo4judge').val() == '') {
            $('#candidatecombo4judge').next('span').text('End date is required.');
            empty = true;
        }
        if (score == '') {
            empty = true;
        }
        if (judgeid == '') {
            empty = true;
        }
        if (criteriaid == '') {
            empty = true;
        }

        if (empty == true) {
            toastr.error('Please input all the required fields correctly.', 'error!');
            return false;
        }
        console.log('eventid',$('#eventcombo4judge').val());
        console.log('judgeid',judgeid);
        console.log('criteriaid',criteriaid);
        console.log('contestantid',$('#candidatecombo4judge').val());
        console.log('score',score);
        $.ajax({
                url: '../server/scores/',
                async: false,
                type: 'PUT',
                crossDomain: true,
                dataType: 'json',
                data: {
                    eventid: $('#eventcombo4judge').val(),
                    judgeid: judgeid,
                    criteriaid: criteriaid,
                    contestantid:$('#candidatecombo4judge').val(),
                    score:score
                },
                success: function(response) {
                    var decode = response;
                    if (decode.success == true) {
                        toastr.success('Server response', 'Records successfully updated!');
                    } else if (decode.success === false) {
                        toastr.error('failed saving records!', 'error!');
                    } 
                },
                error: function(error) { 
                    console.log("Error:");
                    console.log(error.responseText);
                    console.log(error.message);
                    toastr.error('Server responds!', error.responseText);
                    return;
                }
        
        });
    }
    
}
