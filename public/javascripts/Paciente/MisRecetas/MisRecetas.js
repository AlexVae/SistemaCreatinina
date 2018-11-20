var RecetasApp = angular.module('RecetasApp', ['dx']), FechaSeleccionada,vuelta=0;
var gridInstancePorMeses;
RecetasApp.controller('RecetasController', function DemoController($scope,$http) {
//================================Popups=====================================
 $scope.visiblePopupReceta = false;
    $scope.showInfoReceta = function () {
            $scope.visiblePopupReceta= true;
    };
    $scope.popupRecetas={
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Mis recetas",
        dragEnabled: false,
        scrolling: {
            mode: "virtual"
        },
        closeOnOutsideClick: false,
        bindingOptions: {
            visible: "visiblePopupReceta",
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
 var PorMeses =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Patient/GetSchetch/"+FechaSeleccionada,
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
        	FechaSeleccionada=e.data.Fecha;
        	/*var startD=moment(FechaSeleccionada,'MM-DD-YYYY');    
        	console.log(startD.month()+1);   */  
        	if(vuelta==0){
              $scope.showInfoReceta();
              vuelta++;
        	}else{
             gridInstancePorMeses.refresh();
             gridInstancePorMeses.repaint();
             $scope.showInfoReceta();
        	}
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
 $scope.dataGridRecetas={
       dataSource: PorMeses,
       noDataText: "No hay información para mostrar.",
       onInitialized: function (e) {
            gridInstancePorMeses = e.component;
        },
        onRowClick: function(e){
        	console.log(e.data);
        	CreatePDF(e.data);
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },columns: [
         { caption: "Fecha de receta", dataField: "Fecha",alignment: 'center' },
         { caption: "Nombre del médico", dataField: "Nombre_Usuario",alignment: 'center' },
         { caption: "Correo del médico", dataField: "Correo_usuario",alignment: 'center' },
         { caption: "Teléfono del médico", dataField: "Numero_Celular_usuario",alignment: 'center' }
        ],
             showBorders: true
 };
//===========================================================================
//==================================Apoyos===================================
 async function CreatePDF(dataToPDF){
   $.get('http://localhost:3000'+'/Patient/GetSchetchMedicine/'+dataToPDF.ID_Consultas, function (data) {
    }).done(function (data) {
      console.log(data);
      /*
         var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('table.pdf');
      */
     /*var pdf = new jsPDF('p','pt');
     pdf.text(20,20,"Mostrando una Tabla con JsPDF y el Plugin AutoTable");
     var columns = ["Nombre", "Dosis", "Recomendaciones"];
     var ToRecipe=[];
     data.forEach(function(element, index, array) {
      var ElementInRecipe=[element.Nombre,element.Dosis,element.Recomendaciones];
      ToRecipe[index]=ElementInRecipe;
     });
     pdf.autoTable(columns,ToRecipe,{startY: 20});
      
     pdf.save('RecetaMedica.pdf');*/
      var pdf = new jsPDF();
  pdf.text(20,10,"Receta médica generada el día: "+FechaSeleccionada);
  pdf.setFontSize(10);
  pdf.text(20,15,"Nombre del médico: "+dataToPDF.Nombre_Usuario+" "+dataToPDF.Apellido_Paterno_usuario+" "+dataToPDF.Apellido_Materno_usuario);
  pdf.text(20,20, "Cédula profesional: "+dataToPDF.ID_Cedula_Profesional);
  var columns = ["Nombre", "Dosis", "Recomendaciones"];
     var ToRecipe=[];
     data.forEach(function(element, index, array) {
      var ElementInRecipe=[element.Nombre,element.Dosis,element.Recomendaciones];
      ToRecipe[index]=ElementInRecipe;
     });

  pdf.autoTable(columns,ToRecipe,
    { margin:{ top: 25  }},{
    startY: 200
  }
  );

  pdf.save('RecetaMedica'+FechaSeleccionada+'.pdf');
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
 } 



//===========================================================================
});