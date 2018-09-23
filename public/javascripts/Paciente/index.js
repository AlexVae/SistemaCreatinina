var IndexApp = angular.module('IndexApp', ['dx']);
var customers = [{
    "FechaDeVisita": "15/08/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Normal",
    "Recomendacion": "Disminuir el consumo sal, fosforo y potasio de su dieta.",
    "ProximaCita": "20/08/18"
},{
	"FechaDeVisita": "14/08/18",
    "MedicoACargo": "Oswaldo Cruz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Disminuir consumo de proteinas y carnes rojas.",
    "ProximaCita": "15/08/18"
}, {
	"FechaDeVisita": "13/08/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Suspender totalmente consumo de alcohol y tabaco.",
    "ProximaCita": "14/08/18"
},{
	"FechaDeVisita": "07/08/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Dormir con los pies elevados para prevenir inchazones.",
    "ProximaCita": "13/08/18"
},{
	"FechaDeVisita": "06/08/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Conseguir calcetines compresores.",
    "ProximaCita": "07/08/18"
},{
	"FechaDeVisita": "05/08/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Tratar de salir a caminar 20 minutos diarios.",
    "ProximaCita": "06/08/18"
},{
	"FechaDeVisita": "29/07/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Aumento de injesta de espinacas y acelgas.",
    "ProximaCita": "05/08/18"
},{
	"FechaDeVisita": "28/07/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Respetar periodo de sueño; 8 horas mínimas.",
    "ProximaCita": "29/07/18"
},{
	"FechaDeVisita": "27/07/18",
    "MedicoACargo": "Alvaro Díaz",
	"CreatinyRegistry": "Creatinina Alta",
    "Recomendacion": "Respetar horario de medicación.",
    "ProximaCita": "28/07/18"
}];

var datosPersonales={
"Nombre": "Alejandro",
"ApellidoP":"Delgado",
"ApellidoC":"Castañeda",
"MedicoPlanta":"Alvaro Días"
};
IndexApp.controller('IndexController', function IndexController($scope) {
    $scope.dataGridOptions = {
        dataSource: customers,
		  columnChooser: {
            enabled: true,
            title: 'Selección de columna',
            emptyPanelText: 'Se arrastra una comlumna aquí'
        },
         groupPanel: {
            emptyPanelText: "Agrupar",
            visible: "true"
        },
		columnAutoWeigth: true,
        columnAutoWidth: true,
		 "export": {
            enabled: true,
            fileName: "HistorialDeVisita",
            allowExportSelectedData: true
        },
		 paging: {
            pageSize: 3
        },
        columns: [{ caption: "Fecha de la visita", dataField: "FechaDeVisita" }, { caption: "Médico que atendió", dataField: "MedicoACargo" },{caption:"Últimos resultados", dataField:"CreatinyRegistry"}, {caption:"Últimas recomendaciones", dataField:"Recomendacion"}, {caption:"Proxima cita", dataField:"ProximaCita"}],
        showBorders: true
    };

$scope.ReaderForm = {
        formData: datosPersonales,
        colCount: 4,
        labelLocation: "top",
        validationGroup: "OreForm"
    };

});