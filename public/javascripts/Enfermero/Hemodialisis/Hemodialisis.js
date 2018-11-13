var HemodialisisApp = angular.module('HemodialisisApp', ['dx']),popupPrincipal,PreDatos,AntroDatos, popupInicio,ConsultaActual,banderaGrids=false, idUsuario, gridInstanceInfo,HemodialisisActual;
var subformInstanceStart, gridInstancePre,subformInstanceAntro, gridInstanceAntro,subformInstanceMedicine, gridInstanceMedicine, gridInstanceCreatinina;
var socket = io.connect('http://localhost:3000', { 'forceNew': true });
HemodialisisApp.controller('HemodialisisController', function DemoController($scope,$http) {
//================================Formulario=================================
    $scope.formOptionsStart={
         colCount: 4,
        labelLocation: "top",
        validationGroup: "StartData",
        onInitialized: function (e) {
            subformInstanceStart = e.component;
        }, items:[{
        	
                dataField: "PesoSeco",
                label: { text: "Peso seco del paciente" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de peso seco."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "PesoPreHd",
                label: { text: "Peso antes de hemodiálisis (kg)" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de peso antes de la hemodiálisis."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "Uf",
                label: { text: "U.F total planes de ml" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de U.F."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "RemocionLiquidos",
                label: { text: "Remoción de líquidos (UF en máquina)" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de UF señalada por la máquina."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "DxTx",
                label: { text: "DxTx" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de glucosa en sangre."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "SPO2",
                label: { text: "SPO2" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de saturación de hemoglobina."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "TC",
                label: { text: "TC" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del TC."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "FR",
                label: { text: "FR" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de FR."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "FCPre",
                label: { text: "FC pre-procedimiento" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de FC."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "Filtro",
                label: { text: "Filtro" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del tipo de filtro."
                },{
                    type: "pattern",
                    pattern: "^[0-9A-Za-z]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "QB",
                label: { text: "Qb (ml/min)" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de Qb."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "QD",
                label: { text: "Qd (ml/min)" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de Qb."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
                dataField: "Dializador",
                label: { text: "Dializador" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: dializador,//CHANGE
                    displayExpr: "dializador",
                    valueExpr: "dializador"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
        	
                dataField: "Heparina",
                label: { text: "Heparina" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de heparina."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "DosisIni",
                label: { text: "Dosis inicial" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de la dosis inicial."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "INF",
                label: { text: "INF" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de INF."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
                dataField: "ProtocoloTrans",
                label: { text: "Protocolo de transplante" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "Op"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
        	
                dataField: "VSP",
                label: { text: "VSP" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de VPS."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "KTV",
                label: { text: "KT/V" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de KT/V."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "Hemo",
                label: { text: "Hemoglobina" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de INF."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
                dataField: "HB",
                label: { text: "Hepatitis B" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "Op"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
                dataField: "HC",
                label: { text: "Hepatitis C" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "Op"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
                dataField: "VIH",
                label: { text: "VIH" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "Op"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             }]
  };
  $scope.formOptionsAntro={
  	    colCount: 4,
        labelLocation: "top",
        validationGroup: "AntroData",
        onInitialized: function (e) {
            subformInstanceAntro = e.component;
        }, items:[{
             itemType: "group",
             caption: "Comportamientos corporales",
             items:[
               {
        	
                dataField: "PorGrasa",
                label: { text: "% GRASA" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de porcentaje de grasa corporal."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "MM",
                label: { text: "MM" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de MM."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "PorAgua",
                label: { text: "% AGUA" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de porcentaje de agua corporal."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "GV",
                label: { text: "GV" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de GV."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "IMC",
                label: { text: "IMC" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de IMC."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "PesoSeco",
                label: { text: "Peso seco" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de peso seco del paciente."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        }
               ]},{
               	itemType: "group",
             caption: "Circunferencias y pliegues cutaneos", 
            items:[
               {
        	
                dataField: "Estatura",
                label: { text: "Estatura" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de la estatura."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "CMB",
                label: { text: "CMB" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de CMB."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "CMUÑECA",
                label: { text: "COMPLEJO ARTICULAR MUÑECA" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del complejo articular."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "PCT",
                label: { text: "PCT" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de PCT."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "Complexion",
                label: { text: "Complexión" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de Complexión."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        },{
        	
                dataField: "AMBD",
                label: { text: "AMBd%" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de AMBd."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]
            
           
        }
             ]}
        ]
  }
  $scope.formOptionsMedicine={
        colCount: 4,
        labelLocation: "top",
        validationGroup: "RecipeData",
        onInitialized: function (e) {
            subformInstanceMedicine = e.component;
        }, items:[
            {
                dataField: "ID_Medicamento",
                label: { text: "Medicamentos recetados" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: Medicinas,//CHANGE
                    displayExpr: "Nombre_cantidad",
                    valueExpr: "ID_Medicamento"
                },validationRules: [{
                    type: "required",
                    message: "Seleccionar al menos un medicamento."
                }] 
            },{
               dataField: "Descripcion",
                label: { text: "Descripción del uso" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: "100%",
                    width: "90%"
                }, validationRules:[{
                    type:"required",
                    message:"Es necesario introducir una descripción de los medicamentos usados."
                },
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.¿?!¡\\s]+$",
                    message: "No utilizar caracteres especiales."

                },{
                    type: "stringLength",
                    min: 15,
                    message: "Introducir al menos 15 letras de descripción."
                }
                ]
             }
        ]
   
  };
//===========================================================================

//================================Peticiones=====================================
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
                url: "http://localhost:3000/Nurse/GetTodayHemodialisisInfo",
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
                url: "http://localhost:3000/Nurse/GettingInfo/"+idUsuario,
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
  var PreInfo =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Nurse/GetAllPreData/"+HemodialisisActual.ID_Hemodialisis,
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
  var AntroInfo =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Nurse/GetAllAntroData/"+HemodialisisActual.ID_Hemodialisis,
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
  var Medicine =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Nurse/GettingActualMedicine/"+HemodialisisActual.ID_Hemodialisis,
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
  var Creatinina =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Nurse/GetCreatininaData/"+HemodialisisActual.ID_Hemodialisis,
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
//===========================================================================
//==================================Popup====================================
  $scope.visiblePopup = false;
    $scope.showInfo = function () {
            $scope.visiblePopup = true;
    };
   $scope.popupPrincipal = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        onInitialized: function (e) {
           popupPrincipal = e.component;
        },
        showTitle: true,
        title: "Sesión de hemodiálisis",
        dragEnabled: false,
        scrolling: {
            mode: "virtual"
        },
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopup",
        }
    };

    $scope.visiblePopupInicio = false;
    $scope.showInfoInicio = function () {
            $scope.visiblePopupInicio = true;
    };
   $scope.popupDatosInicio = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        onInitialized: function (e) {
           popupInicio = e.component;
        },
        showTitle: true,
        title: "Registro de datos Pre-procedimiento",
        dragEnabled: false,
        scrolling: {
            mode: "virtual"
        },
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopupInicio",
        }
    };
    //Creatinina
    $scope.visiblePopupCreatinina = false;
    $scope.showInfoCreatinina = function () {
            $scope.visiblePopupCreatinina = true;
    };
    $scope.popupCreatinina={
        width: "90%",
        height: "40%",
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
//==================================Grid=====================================
  $scope.dataGridOptions = {
        dataSource: Schetch,
        noDataText: "No hay datos de alguna consulta.",
         onInitialized: function (e) {
            gridInstanceSchet = e.component;
        },onRowClick: function(e){
          console.log(e.data);
          ConcultaActual=e.data; 
          idUsuario=e.data.ID_Paciente;
          HemodialisisActual=e.data;
          PreDatos=e.data.PreDatos;
          AntroDatos=e.data.AntroDatos;
          if(banderaGrids){
            gridInstanceInfo.refresh();
            gridInstanceInfo.repaint();
            gridInstancePre.refresh();
            gridInstancePre.repaint();
            gridInstanceAntro.refresh();
            gridInstanceAntro.repaint();
        }else{
        	banderaGrids=true;
        }
          $scope.showInfo();
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
            fileName: "MisDatosDeHemodialisisData",
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
             {caption:"Fecha de hemodiálisis", dataField:"startDate", alignment:"center"}
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
        width: 1230,
        height: 150,
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
             {caption:"Acceso vascular", dataField:"Acceso_Vascular", alignment:"center"},
             {caption:"Médico tratante", dataField:"Medico_Tratante", alignment:"center"},
             {caption:"Horas hemodiálisis", dataField:"Duracion", alignment:"center"}
             ],
       showBorders: true
    };
   $scope.dataGridPreInfo={
       dataSource: PreInfo,
       noDataText: "No hay datos de pre-procedimiento.",
       onInitialized: function (e) {
            gridInstancePre = e.component;
        },
        onRowClick: function(e){
        	subformInstanceStart.resetValues();
        	subformInstanceStart.updateData(e.data);
        	console.log(e.data);
        	slideFormContainer("block", "edit");
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },columns: [
             { caption: "Peso seco", dataField: "PesoSeco",alignment: 'center' },
             { caption: "Peso(antes hemodiálisis)", dataField: "PesoPreHd",alignment: 'center' },
             {caption:"Uf", dataField:"Uf",alignment:"center"},
             {caption:"Remocion Liquidos", dataField:"RemocionLiquidos", alignment:"center"},
             {caption:"SPO2", dataField:"SPO2", alignment:"center"},
             {caption:"TC", dataField:"TC", alignment:"center"},
             {caption:"FR", dataField:"FR", alignment:"center"},
             {caption:"FC pre-procedimiento", dataField:"FCPre", alignment:"center"},
             {caption:"Filtro", dataField:"Filtro", alignment:"center"},
             {caption:"QB", dataField:"QB", alignment:"center"},
             {caption:"QD", dataField:"QD", alignment:"center"},
             {caption:"Dializador", dataField:"Dializador", alignment:"center"},
             {caption:"Heparina", dataField:"Heparina", alignment:"center"},
             {caption:"Dosis inicial", dataField:"DosisIni", alignment:"center"},
             {caption:"INF", dataField:"INF", alignment:"center"},
             {caption:"Protoco de transplantetr", dataField:"ProtocoloTrans", alignment:"center"},
             {caption:"VSP", dataField:"VSP", alignment:"center"},
             {caption:"KT/V", dataField:"KTV", alignment:"center"},
             {caption:"Hemoglobina", dataField:"Hemo", alignment:"center"},
             {caption:"HB", dataField:"HB", alignment:"center"},
             {caption:"HC", dataField:"HC", alignment:"center"},
             {caption:"VIH", dataField:"VIH", alignment:"center"}
             ],
             showBorders: true
    };
   $scope.dataGridAntroInfo={
       dataSource: AntroInfo,
       noDataText: "No hay datos antropométricos.",
       onInitialized: function (e) {
            gridInstanceAntro = e.component;
        },
        onRowClick: function(e){
        	subformInstanceAntro.resetValues();
        	subformInstanceAntro.updateData(e.data);
        	slideFormContainer("block1", "edit2");
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },columns: [
             { caption: "% GRASA", dataField: "PorGrasa",alignment: 'center' },
             { caption: "MM", dataField: "MM",alignment: 'center' },
             {caption:"% AGUA", dataField:"PorAgua",alignment:"center"},
             {caption:"GV", dataField:"GV", alignment:"center"},
             {caption:"IMC", dataField:"IMC", alignment:"center"},
             {caption:"Peso seco", dataField:"PesoSeco", alignment:"center"},
             {caption:"Estatura", dataField:"Estatura", alignment:"center"},
             {caption:"CMB", dataField:"CMB", alignment:"center"},
             {caption:"C. MUÑECA", dataField:"CMUÑECA", alignment:"center"},
             {caption:"PCT", dataField:"PCT", alignment:"center"},
             {caption:"Complexion", dataField:"Complexion", alignment:"center"},
             {caption:"AMBd%", dataField:"AMBD", alignment:"center"}
             ],
             showBorders: true
    
   };
   $scope.dataGridMedicines={
   	  dataSource: Medicine,
       noDataText: "No hay datos de medicinas.",
       onInitialized: function (e) {
            gridInstanceMedicine = e.component;
        },
        onRowClick: function(e){
        	subformInstanceMedicine.resetValues();
        	ReturnMedicineInformation();
        	subformInstanceMedicine.updateData(e.data);
        	slideFormContainer("block2", "edit1");
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        }, columns:[
           { caption: "Medicamento usado", dataField: "Nombre_cantidad",alignment: 'center' },
           { caption: "Descripción", dataField: "Descripcion",alignment: 'center' },{
                dataField: "Eliminar",
                cellTemplate: function (container, e) {
                    $("<div>")
                        .append('<button class="btn btn-default"> <i class="fa fa-trash"></i></button>').on('click', function (evt) {
                            var result = DevExpress.ui.dialog.confirm("¿Se requiere eliminar este registro?", "Se necesita una confirmación...");
                            result.done(function (dialogResult) {
                                if (dialogResult == true) {
                                   DeleteMedicineData(e.data.ID_MedicinaHemodialisis);
                                   gridInstanceMedicine.refresh();
                                   gridInstanceMedicine.repaint();
                                   // DeleteEmployee(e.data.EmployeeId, e.data.Name, e.data.PaternalLastName, e.data.MaternalLastName, e.data.CompanyId, e.data.SmartFlowTagId, e.data.NoEmployee);
                                }
                            
                            });
                           

                        })
                        .appendTo(container);
                },alignment:"center"

            }
        ]
   };
   $scope.dataGridCreatinina={
       dataSource: Creatinina,
       noDataText: "No hay datos de Creatinina.",
       onInitialized: function (e) {
            gridInstanceCreatinina = e.component;
        },
        onRowClick: function(e){
        	subformInstanceAntro.resetValues();
        	subformInstanceAntro.updateData(e.data);
        	slideFormContainer("block1", "edit2");
        },
        columnAutoWeigth: true,
        columnAutoWidth: true,
        searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        },columns: [
             { caption: "Periodo", dataField: "Periodo",alignment: 'center' },
             { caption: "Valor de Creatinina", dataField: "Valor",alignment: 'center' },
             { caption: "IFG", dataField: "IFG",alignment: 'center' }
             ],
             showBorders: true
    
   };
//===========================================================================

//==================================Botones==================================
  //BOTONES DE POPUP
  $scope.showFormAuxDatosInicio={
       text: "Pre-procedimiento",
        icon: 'lnr lnr-user',
        onClick: function (e) {
        	if(PreDatos==1){
             subformInstanceStart.updateData(gridInstancePre.getDataSource()._items[0]);
             slideFormContainer("block", "edit");
        	}else{
             subformInstanceStart.resetValues();
             slideFormContainer("block", "create");
        	}
        	 
        }
  };
  $scope.showFormAuxDatosAntro={
  	text: "Antropometría",
        icon: 'lnr lnr-user',
        onClick: function (e) {
        	if(AntroDatos==1){
        	   subformInstanceAntro.updateData(gridInstanceAntro.getDataSource()._items[0]);
               slideFormContainer("block1", "edit2");
        	}else{
        		subformInstanceAntro.resetValues();
               slideFormContainer("block1", "create2");
        	}
        	
        }
  }
  $scope.showFormAuxMedicine={
    text: "Medicamento usado",
        icon: 'lnr lnr-user',
        onClick: function (e) {
        	subformInstanceMedicine.resetValues();
        	ReturnMedicineInformation();
        	slideFormContainer("block2", "create1");
        	
        }
  };
  $scope.showFormAuxCreatinina={
    text: "Creatinina",
        icon: 'lnr lnr-user',
        onClick: function (e) {
            
              $scope.showInfoCreatinina();
            
        	
        	
        }
  };
  $scope.FinishSession={
        text: "Terminar sesión",
        type: "danger",
        useSubmitBehavior: true,
        validationGroup: "ClinicData",
        icon: '',
        onClick: function () {
            var result = DevExpress.ui.dialog.confirm("¿Se encuentra seguro de querer terminar la sesión de hemodiálisis?", "Se necesita una confirmación");
                  result.done(function (dialogResult) {
                      //alert(dialogResult);
                    if (dialogResult) {
                     if(PreDatos==1&&AntroDatos==1&&InicioCreatinina==1&&FinCreatinina){
                     
              }else{
                DevExpress.ui.dialog.alert("Se necesita primero guardar datos antropométricos, datos pre-hemodiálisis y tener registro de creatinina en sangre.", "¡Atención!");
              }
                      }
                });
             
        }
     };
  //PreHemodialisis
     $scope.SfButtonCreateH={
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "StartData",
        onClick: function () {
            if (subformInstanceStart.validate().isValid) {
                var data = subformInstanceStart.option("formData"), bandera = true;
                data.ID_Hemodialisis=HemodialisisActual.ID_Hemodialisis;
                console.log(PreDatos);
                console.log(HemodialisisActual);
                HemodialisisSession(data);
                PreDatos=1;
                subformInstanceStart.resetValues();
                gridInstancePre.refresh();
                gridInstancePre.repaint();
               // subformInstanceH.resetValues();
            }
        }
      };
     $scope.SfButtonUpdateH={
     text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "StartData",
        onClick: function () {
            if (subformInstanceStart.validate().isValid) {
                var data = subformInstanceStart.option("formData"), bandera = true;
                data.ID_Hemodialisis=HemodialisisActual.ID_Hemodialisis;
                UpdateHemodialisisSession(data);
                subformInstanceStart.resetValues();
                gridInstancePre.refresh();
                gridInstancePre.repaint();
               // subformInstanceH.resetValues();
            }
        }
      };
    //antropometría
    $scope.SfButtonCreateA={
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "StartData",
        onClick: function () {
            if (subformInstanceAntro.validate().isValid) {
                var data = subformInstanceAntro.option("formData"), bandera = true;
                data.ID_Hemodialisis=HemodialisisActual.ID_Hemodialisis;
                NewAntroData(data);
                AntroDatos=1;
                gridInstanceAntro.refresh();
                gridInstanceAntro.repaint();
            }
        }
      };
     $scope.SfButtonUpdateA={
     text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "StartData",
        onClick: function () {
            if (subformInstanceAntro.validate().isValid) {
                var data = subformInstanceAntro.option("formData"), bandera = true;
                data.ID_Hemodialisis=HemodialisisActual.ID_Hemodialisis;
                UpdateAntroData(data);
                gridInstanceAntro.refresh();
                gridInstanceAntro.repaint();

            }
        }
      };
    //Medicamento usado
    $scope.SfButtonCreateM={
      text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "RecipeData",
        onClick: function () {
            if (subformInstanceMedicine.validate().isValid) {
                var data = subformInstanceMedicine.option("formData"), bandera = true;
                data.ID_Hemodialisis=HemodialisisActual.ID_Hemodialisis;
                CreateMedicineData(data);
                gridInstanceMedicine.refresh();
                gridInstanceMedicine.repaint();
                subformInstanceMedicine.resetValues();
            }
        }
    };
    $scope.SfButtonUpdateM={
    	text: "Registrar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "RecipeData",
        onClick: function () {
            if (subformInstanceMedicine.validate().isValid) {
                var data = subformInstanceMedicine.option("formData"), bandera = true;
                data.ID_Hemodialisis=HemodialisisActual.ID_Hemodialisis;
                UpdateMedicineData(data);
                gridInstanceMedicine.refresh();
                gridInstanceMedicine.repaint();
            }
        }
    }
    //Hemodialisis
    $scope.DisponibilidadInicio=true;
    $scope.InicioCreatinina={
        text: "Inicio de hemodiálisis",
        icon: 'lnr lnr-heart-pulse',
        onClick: function (e) {
        	if(HemodialisisActual.InicioCreatinina==0){
                StartHemoSession(HemodialisisActual.ID_Hemodialisis);
             HemodialisisActual.InicioCreatinina=1;
            }else{
               DevExpress.ui.dialog.alert("Atención, se debe proseguir al fin de la sesión.","Alerta");
            }
        }
    };
    $scope.FinCreatinina={
    	text: "Fin de hemodiálisis",
        icon: 'lnr lnr-heart-pulse',
        onClick: function (e) {
        	if(HemodialisisActual.InicioCreatinina==1){
                //PODEMOS ACTUALIZAR
                HemodialisisActual.FinCreatinina=1;
            }else if(HemodialisisActual.FinCreatinina==1){
                DevExpress.ui.dialog.alert("Atención, se han terminado todas las sesiones.","Alerta");
            }else{
                DevExpress.ui.dialog.alert("Atención, necesitas iniciar la sesión.","Alerta");
            }
        }
    }
//===========================================================================
$scope.pruebaScrollView={
             height: '100%',
             width: '100%',
             direction: 'both'
};
socket.on('messages', function(data) {
    try{
      gridInstanceCreatinina.refresh();
    gridInstanceCreatinina.repaint();
    }catch(e){

    }
});
async function ReturnMedicineInformation(){
    var dataToForm = $.ajax({

              type: 'GET',

               url: "http://localhost:3000/Nurse/GettingMedicalInfo",

              async: false,

            dataType: "json",

           

           success: function (data) {

              return data;

           },

            error: function (xhr, type, exception) {

                // Do your thing

            }

        });
               Medicines= dataToForm.responseJSON;
               try{

              subformInstanceMedicine._editorInstancesByField.ID_Medicamento.option("items", Medicines);

               }catch(error){

               }}
});