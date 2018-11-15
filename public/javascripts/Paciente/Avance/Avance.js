var AvanceApp = angular.module('AvanceApp', ['dx']), FechaSeleccionada;
var charInstance,vuelta=0,gridInstanceCreatinina,gridInstanceInfo;
AvanceApp.controller('AvanceController', function DemoController($scope,$http) {
//================================Popus======================================
  $scope.visiblePopupCreatinina = false;
    $scope.showInfoCreatinina = function () {
            $scope.visiblePopupCreatinina = true;
    };
    $scope.popupCreatinina={
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Registro de Creatinina",
        dragEnabled: false,
        scrolling: {
            mode: "virtual"
        },
        closeOnOutsideClick: false,
        bindingOptions: {
            visible: "visiblePopupCreatinina",
        }
    };
//===========================================================================

//================================Peticiones=================================
 var Meses =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Patient/GetMonths",
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // clinicos=response.data.Clinicos;
                   // disableLoader();
                     //console.log(response.data);
                    return { data: response.data };
                }, function (response) {
                    //disableLoader();
                    //return $q.reject("Data Loading Error");
                });
        },
        remove: function (key) {
            DeleteProduct(key);
        }
    });
 var ToGraffy =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Patient/GetCreatininaData/"+FechaSeleccionada,
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // clinicos=response.data.Clinicos;
                   // disableLoader();
                     //console.log(response.data);
                    return { data: response.data };
                }, function (response) {
                    //disableLoader();
                    //return $q.reject("Data Loading Error");
                });
        },
        remove: function (key) {
            DeleteProduct(key);
        }
    });
 var ToGrid =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Patient/GetCreatininaInfo/"+FechaSeleccionada,
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // clinicos=response.data.Clinicos;
                   // disableLoader();
                     //console.log(response.data);
                    return { data: response.data };
                }, function (response) {
                    //disableLoader();
                    //return $q.reject("Data Loading Error");
                });
        },
        remove: function (key) {
            DeleteProduct(key);
        }
    });
//===========================================================================

//==================================Grid=====================================
 $scope.dataGridOptions={
   dataSource: Meses,
       noDataText: "No hay información para mostrar.",
       onInitialized: function (e) {
            gridInstanceInfo = e.component;
        },
        onRowClick: function(e){
        	console.log(e.data)
        	FechaSeleccionada=e.data.Fecha;
        	charInstance.getDataSource().reload();
        	gridInstanceCreatinina.refresh();
        	gridInstanceCreatinina.repaint();
        	slideFormContainer("block", "create");
        	//GetDataToGrafficMonth(e.data);
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },columns: [
         { caption: "Mes", dataField: "Mes",alignment: 'center' },
         { caption: "Año", dataField: "Año",alignment: 'center' }
        ],
             showBorders: true
 };
 $scope.dataGridCreatinina={
 	dataSource: ToGrid,
       noDataText: "No hay datos de Creatinina.",
       onInitialized: function (e) {
            gridInstanceCreatinina = e.component;
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },columns: [
         { caption: "Fecha", dataField: "Fecha",alignment: 'center' },
         { caption: "Periodo", dataField: "Periodo",alignment: 'center' },
         { caption: "Horas de hemodiálisis", dataField: "Horas",alignment: 'center' },
         { caption: "Creatinina en periodo", dataField: "Valor",alignment: 'center' },
         { caption: "IFG del periodo", dataField: "IFG",alignment: 'center' }
        ],
             showBorders: true
 };
 //var Graffic={Fecha:element.Fecha,Valor:element.Valor,IFG:element.IFG,Periodo:element.Periodo,Horas:diff2.hours};
//===========================================================================

//==================================Botones==================================
//===========================================================================
async function GetDataToGrafficMonth(CreatiDate){
	$.post('http://localhost:3000'+'/Patient/GetCreatininaData/CreatiDate',CreatiDate, function (data) {
    }).done(function (data) {
     //dataSource=data;
     console.log(data);
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}
$scope.chartOptions={
        palette: "red",
        onInitialized: function (e) {
            charInstance = e.component;
        },
        dataSource: ToGraffy,
        commonSeriesSettings: {
            type: types[0],
            argumentField: "Fecha"
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
            { valueField: "ValorFi", name: "Final" },
            { valueField: "ValorIni", name: "Inicial" }
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
       
    };



});