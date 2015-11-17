var d;
var d2;
$(document).ready(function(){
    //getData2('');
    loadacivitiesToCombo9();
    getData();

    loadacivitiesToCombo10();
    getDataA();
    //loadeventsToscoreCombo9($('#actcombo4score9').val());

});

function loadeventsToscoreCombo9(id){
    
    // $("#evtcombo4score9").html('');
    // // $("#select2-chosen-20").val('');
    // // $("#select2-chosen-20").html('');
    // // $(".select2-chosen").html('');

    // $.ajax({
    //     url: '../server/events_ext1/index.php/'+id,
    //     async: false,
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function(response) {
    //         var decode = response;
    //         console.log('>loading data to combo-judge..');
    //         if (decode) {
    //             if (decode.childs.length > 0) {
    //                     var html = '<option value="">select</option>';
    //                     $("#evtcombo4score9").append(html);
    //                 for (var i = 0; i < decode.childs.length; i++) {
    //                     var row = decode.childs; 
    //                     var html = '<option value="'+row[i].eventid+'">'+row[i].eventname+'</option>';
    //                     $("#evtcombo4score9").append(html);
    //                 }
    //             } else {
    //                 toastr.success('no records to display');
    //             }
    //         }
    //     },
    //     error: function(error) {
    //         toastr.error('Error', error);
    //         return;
    //     }
    // });
}

function loadacivitiesToCombo9(){
    $.ajax({
        url: '../server/activities/index.php',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-judge..');
            if (decode) {
                var html = '<option value="">select</option>';
                $("#actcombo4score9").append(html);
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].actid+'">'+row[i].actname+'</option>';
                        $("#actcombo4score9").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('Error', error);
            return;
        }
    });
}

function loadacivitiesToCombo10(){
    $.ajax({
        url: '../server/activities/index.php',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
            console.log('>loading data to combo-judge..');
            if (decode) {
                var html = '<option value="">select</option>';
                $("#actcombo4score10").append(html);
                if (decode.childs.length > 0) {
                    for (var i = 0; i < decode.childs.length; i++) {
                        var row = decode.childs; 
                        var html = '<option value="'+row[i].actid+'">'+row[i].actname+'</option>';
                        $("#actcombo4score10").append(html);
                    }
                }
            }
        },
        error: function(error) {
            console.log('Error', error);
            return;
        }
    });
} 
function getData(){
   
    $.ajax({
        url: '../server/scores/index.php',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
             console.log('decode',decode);
            if (decode) {
                d = decode; console.log('d=',d);
            }
        },
        error: function(error) {
           toastr.error('error loading scores!', error.responseText);
            return;
        }
    });
}


function getDataA(){
   
    $.ajax({
        url: '../server/scores/index.php',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
             console.log('decode',decode);
            if (decode) {
                d2 = decode; console.log('d2=',d2);
            }
        },
        error: function(error) {
           toastr.error('error loading scores!', error.responseText);
            return;
        }
    });
}

function getData2(x){
    console.log('x->',x);
    $.ajax({
        url: '../server/scores_ext2/index.php/'+x,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
             console.log('decode',decode);
            if (decode) {
                d = decode; console.log('d=',d);
                ChartsAmcharts.init();
            } else {
                //toastr.success('no data available');
            }
        },
        error: function(error) {
            toastr.error('error loading scores!', error.responseText);
            return;
        }
    });
}

function getData22(x){
    console.log('x->',x);
    $.ajax({
        url: '../server/scores_ext2/index.php/'+x,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var decode = response;
             console.log('decode',decode);
            if (decode) {
                d2 = decode; console.log('d=',d);
                ChartsAmcharts2.init();
            } else {
                //toastr.success('no data available');
            }
        },
        error: function(error) {
            toastr.error('error loading scores!', error.responseText);
            return;
        }
    });
}

var ChartsAmcharts = function() {
     console.log('here');

    var initChartSample5 = function() {
         var dataa = d.data;
         
        var chart = AmCharts.makeChart("chart_5", {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,

            "fontFamily": 'Open Sans',
            
            "color":    '#888',

            "dataProvider": dataa,
            "valueAxes": [{
                "position": "left",
                "axisAlpha": 0,
                "gridAlpha": 0
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "colorField": "color",
                "fillAlphas": 0.85,
                "lineAlpha": 0.1,
                "type": "column",
                "topRadius": 1,
                "valueField": "visits"
            }],
            "depth3D": 40,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "gridAlpha": 0

            },
            "exportConfig": {
                "menuTop": "20px",
                "menuRight": "20px",
                "menuItems": [{
                    "icon": '/lib/3/images/export.png',
                    "format": 'png'
                }]
            }
        }, 0);

        jQuery('.chart_5_chart_input').off().on('input change', function() {
            var property = jQuery(this).data('property');
            var target = chart;
            chart.startDuration = 0;

            if (property == 'topRadius') {
                target = chart.graphs[0];
            }

            target[property] = this.value;
            chart.validateNow();
        });

        $('#chart_5').closest('.portlet').find('.fullscreen').click(function() {
            chart.invalidateSize();
        });
    }

    

    return {
        //main function to initiate the module

        init: function() {

             initChartSample5();
           
        }

    };

}();


var ChartsAmcharts2 = function() {
     console.log('here');

    var initChartSample6 = function() {
         var dataa = d2.data;
         
        var chart = AmCharts.makeChart("chart_6", {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,

            "fontFamily": 'Open Sans',
            
            "color":    '#888',

            "dataProvider": dataa,
            "valueAxes": [{
                "position": "left",
                "axisAlpha": 0,
                "gridAlpha": 0
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "colorField": "color",
                "fillAlphas": 0.85,
                "lineAlpha": 0.1,
                "type": "column",
                "topRadius": 1,
                "valueField": "visits"
            }],
            "depth3D": 40,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "gridAlpha": 0

            },
            "exportConfig": {
                "menuTop": "20px",
                "menuRight": "20px",
                "menuItems": [{
                    "icon": '/lib/3/images/export.png',
                    "format": 'png'
                }]
            }
        }, 0);

        jQuery('.chart_6_chart_input').off().on('input change', function() {
            var property = jQuery(this).data('property');
            var target = chart;
            chart.startDuration = 0;

            if (property == 'topRadius') {
                target = chart.graphs[0];
            }

            target[property] = this.value;
            chart.validateNow();
        });

        $('#chart_6').closest('.portlet').find('.fullscreen').click(function() {
            chart.invalidateSize();
        });
    }

    

    return {
        //main function to initiate the module

        init: function() {

             initChartSample6();
           
        }

    };

}();