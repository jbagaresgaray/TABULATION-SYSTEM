
$(document).ready(function() {
    loadactivitytoScombo1();
    loadeventtoScombo2();
    loadcriteriatoScombo3();
    loadjudgetoScombo4();
});

function loadactivitytoScombo1() {
    $("#loadactivitytoScombo1").html('');
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
                        $("#loadactivitytoScombo1").append(html);
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

function loadeventtoScombo2() {
    $("#loadeventtoScombo2").html('');
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
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option id="x" value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
                        console.log('>metadata',row[i].eventid+' '+row[i].eventname);
                        $("#loadeventtoScombo2").append(html);
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

function loadcriteriatoScombo3() {
    $("#loadcriteriatoScombo3").html('');
    console.log('>loading data to combo-3 after clearing..');
    $.ajax({
        url: '../server/criteria/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-3..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option id="x" value="'+row[i].criteriaid+'">'+row[i].criterianame+'</option>';
                        console.log('>metadata',row[i].criteriaid+' '+row[i].criterianame);
                        $("#loadcriteriatoScombo3").append(html);
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

function loadjudgetoScombo4() {
    $("#loadjudgetoScombo4").html('');
    console.log('>loading data to combo-3 after clearing..');
    $.ajax({
        url: '../server/judges/',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-3..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option id="x" value="'+row[i].judgeid+'">'+row[i].judgefullname+'</option>';
                        console.log('>metadata',row[i].judgeid+' '+row[i].judgefullname);
                        $("#loadjudgetoScombo4").append(html);
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

function loadcriteriatoScombo3byid(id) {
    $("#loadcriteriatoScombo3").html('');
    console.log('>loading data to combo-3 after clearing..');
    $.ajax({
        url: '../server/criteria/index.php/'+id,
        async: true,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-3..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option id="x" value="'+row[i].criteriaid+'">'+row[i].criterianame+'</option>';
                        console.log('>metadata',row[i].criteriaid+' '+row[i].criterianame);
                        $("#loadcriteriatoScombo3").append(html);
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

function loadjudgetoScombo4byid(id) {
    $("#loadjudgetoScombo4").html('');
    console.log('>loading data to combo-3 after clearing..');
    $.ajax({
        url: '../server/judges/index.php/'+id,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-3..',decode);
            if (decode) {
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option id="x" value="'+row[i].judgeid+'">'+row[i].judgefullname+'</option>';
                        console.log('>metadata',row[i].judgeid+' '+row[i].judgefullname);
                        $("#loadjudgetoScombo4").append(html);
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

function loadeventtoScombo2Onchange(id){
    loadcriteriatoScombo3byid(id);
    loadjudgetoScombo4byid(id);
}

