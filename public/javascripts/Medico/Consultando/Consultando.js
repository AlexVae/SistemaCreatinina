var ConsultaApp = angular.module('ConsultaApp', ['dx']), gridInstanceSchet=null,gridInstanceInfo, subformInstance,extraMedico,extraPaciente,subformInstanceP,dataToPut,idUsuario,banderaGrids=false,clinicos,ConcultaActual;
ConsultaApp.controller('ConsultaController', function DemoController($scope,$http) {

//=======================Formulario======================

//===================PopupPrincipal======================
$scope.visiblePopup = false;
$scope.showInfo = function () {
        $scope.visiblePopup = true;
    };
$scope.popupPrincipal = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Consulta médica",
        dragEnabled: false,
        items: [
        {

                dataField: "Nombre_Usuario",
                label: { text: "Nombre" },
                editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el nombre del paciente a registrar."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del nombre a registrar"
                }]
            }],
       // closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopup",
        }
    };

//popup clínico
$scope.visiblePopupC = false;
$scope.showInfoC = function () {
        $scope.visiblePopupC = true;
    };
$scope.popupClinico = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Datos clínicos del paciente",
        dragEnabled: false,
       // closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopupC",
        }
    };
    $scope.visiblePopupS = false;
$scope.showInfoS = function () {
        $scope.visiblePopupS = true;
    };
$scope.popupSintomas = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Síntomas presentados durante la consulta",
        dragEnabled: false,
       // closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopupS",
        }
    };
$scope.formOptionsC = {
        colCount: 4,
        labelLocation: "top",
        validationGroup: "employeesData",
        onInitialized: function (e) {
            subformInstance = e.component;
        },
        items: [
           
           	{
                dataField: "AcidoUrico",
                label: { text: "Ácido úrico del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de ácido úrico."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           }, {
                dataField: "Albumina",
                label: { text: "Albúmina del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de albúmina."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Calcio",
                label: { text: "Calcio del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de calcio."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "CaptacionHierro",
                label: { text: "Captacion de hierro" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de calcio."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Cloro",
                label: { text: "Cloro del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de cloro."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Colesterol",
                label: { text: "Colesterol del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de cloro."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Creatinina",
                label: { text: "Creatinina del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de creatinina."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Fosforo",
                label: { text: "Fósforo del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de fósforo."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Globulinas",
                label: { text: "Globulinas del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de globulinas."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Glucosa",
                label: { text: "Glucosa del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de glucosa."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Hierro",
                label: { text: "Hierro del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de hierro."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "LDH",
                label: { text: "LDH del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del LDH."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "MagnesioEnSangre",
                label: { text: "Magnesio en sangre del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de magnesio en sangre."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "BUN",
                label: { text: "Nitrógeno de Urea en sangre del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del BUN."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Potasio",
                label: { text: "Potasio del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de potasio."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "ProteinaC",
                label: { text: "Proteína C reactiva ultrasensible" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de proteína ultrasensible."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "ProteinaTotal",
                label: { text: "Proteínas totales del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de proteínas totales."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "RelacionAG",
                label: { text: "Relación A/G del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de relación A/G."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Sodio",
                label: { text: "Sodio del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de sodio del paciente."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Trigliceridos",
                label: { text: "Triglicéridos del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de triglicéridos del paciente."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           },{
                dataField: "Urea",
                label: { text: "Urea del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de urea."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           }
        ]
         };

         /*	
		Relación A/G
		Relación BUN/creat
		Sodio
		TGO (AST)
		TGP (ALT)
		Triglicéridos
		Urea*/

$scope.formOptionsSintomas={
        colCount: 4,
        labelLocation: "top",
        validationGroup: "employeesData",
        onInitialized: function (e) {
            subformInstanceP = e.component;
        },
        items: [{
        	dataField: "Sintomas",
        	label:{text:"Síntomas del paciente"},
                editorType: "dxTextArea",
                editorOptions: {
                    height: 140
                }
        }]
};
//=======================================================


$scope.showFormAux = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            subformInstance.resetValues();
           slideFormContainer("block", "create");
        }
    };
 $scope.showFormAuxClinico={
        text: "Datos clínicos",
        icon: 'lnr lnr-users',
        onClick: function (e) {
        	if(clinicos==0)
            $scope.showInfoC();
            else
            	DevExpress.ui.dialog.alert("Ya se han dado de alta los datos clínicos de este paciente en esta consulta", "¡Atención!");
        }
 };
 $scope.showFormAuxSintomas={
 	text: "Síntomas de paciente",
        icon: 'lnr lnr-users',
        onClick: function (e) {
        	$scope.showInfoS();
           // $scope.showInfoC();
        }
 }
//=======================================================

//=======================Peticiones======================
  var Schetch =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GetTodayAppointInfo",
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
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

 var Info =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingInfo/"+idUsuario,
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // disableLoader();
                     //console.log(response.data);
                    // ConcultaActual=response.data.ID_Consultas; 
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
//=======================================================

//=======================DataGrid========================
$scope.dataGridOptions = {
        dataSource: Schetch,
         onInitialized: function (e) {
            gridInstanceSchet = e.component;
        },onRowClick: function(e){
          console.log(e.data);	
          ConcultaActual=e.data.ID_Consultas; 
          idUsuario=e.data.ID_Paciente;
          if(banderaGrids){
            gridInstanceInfo.refresh();
            gridInstanceInfo.repaint();
          }else{
          	banderaGrids=true;
          }
          clinicos=e.data.Clinicos;
          $scope.showInfo();
          dataToPut=e.data;
         // subformInstanceP.updateData(e.data);
        },
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
            fileName: "ContactosEmergenciaDePaciente",
            allowExportSelectedData: true,
            placeholder: 'Exportar archivo'
        },
         paging: {
            pageSize: 3
        }, searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },
       columns: [
             { caption: "Nombre del paciente", dataField: "Nombre_Usuario",alignment: 'center' },
             { caption: "Apellido paterno paciente", dataField: "Apellido_Paterno_usuario",alignment: 'center' },
             {caption:"Apellido materno paciente", dataField:"Apellido_Materno_usuario",alignment:"center"},
             {caption:"Correo del paciente", dataField:"Correo_usuario", alignment:"center"},
             {caption:"Fecha de consulta", dataField:"startDate", alignment:"center"}
             ],
       showBorders: true
    };
   $scope.dataGridMoreInfo={
        dataSource: Info,
         onInitialized: function (e) {
            gridInstanceInfo = e.component;
        },
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
        paging: {
            pageSize: 3
        }, searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },
       columns: [
             { caption: "Nombre del paciente", dataField: "Nombre_Usuario",alignment: 'center' },
             { caption: "Apellido paterno paciente", dataField: "Apellido_Paterno_usuario",alignment: 'center' },
             {caption:"Apellido materno paciente", dataField:"Apellido_Materno_usuario",alignment:"center"},
             {caption:"Correo del paciente", dataField:"Correo_usuario", alignment:"center"},
             {caption:"Fecha de consulta", dataField:"startDate", alignment:"center"}
             ],
       showBorders: true
    };
        
//=======================================================
//====================Botones============================
//Clínicos
$scope.SfButtonCreateClinic={
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "employeesData",
        onClick: function () {
            
            if (subformInstance.validate().isValid) {
                var data = subformInstance.option("formData"), bandera = true;
                data.ID_Consultas=ConcultaActual;
                console.log(data);
                InsertingClinicalInfo(data);
               
            }
        }
    };
//=======================================================
//Apoyo
function ReturnClinicalData(idConsulta){

}


});