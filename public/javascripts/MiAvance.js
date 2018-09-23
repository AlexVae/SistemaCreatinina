$(function(){
    var chart = $("#chart").dxChart({
        palette: "violet",
        dataSource: dataSource,
        commonSeriesSettings: {
            type: types[0],
            argumentField: "year"
        },
        commonAxisSettings: {
            grid: {
                visible: true
            }
        },
        margin: {
            bottom: 20
        },
        series: [
            { valueField: "smp", name: "Creatinina" },
            { valueField: "mmp", name: "IFG" }
        ],
        tooltip:{
            enabled: true
        },
        legend: {
            verticalAlignment: "top",
            horizontalAlignment: "right"
        },
        "export": {
            enabled: true
        },
        argumentAxis: {
            label:{
                format: {
                    type: "decimal"
                }
            },
            allowDecimals: false,
            axisDivisionFactor: 60
        }
       
    }).dxChart("instance");
    
    $("#types").dxSelectBox({
        dataSource: types,
        value: types[0],
        onValueChanged: function(e){
            chart.option("commonSeriesSettings.type", e.value);
        }
    });
});