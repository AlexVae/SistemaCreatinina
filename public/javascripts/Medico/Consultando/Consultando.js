var ConsultaApp = angular.module('ConsultaApp', ['dx']),subformInstanceR, Medicines, Sintomas,gridInstanceRecipes ,gridInstanceSchet=null, gridInstanceSintoma,gridInstanceClinical=null,gridInstanceInfo, subformInstance,extraMedico,extraPaciente,subformInstanceP,dataToPut,idUsuario,banderaGrids=false,clinicos,ConcultaActual,Receta;
ConsultaApp.controller('ConsultaController', function DemoController($scope,$http) {

//=======================Formulario======================
   $scope.formOptionsC = {
        colCount: 4,
        labelLocation: "top",
        validationGroup: "ClinicData",
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
        validationGroup: "SintomasData",
        onInitialized: function (e) {
            subformInstanceP = e.component;
        },
        items: [
           {

            itemType: "group",
            caption: "Datos de consulta",
             items:[
               {
            dataField: "Sintomas",
            label:{text:"Síntomas del paciente"},
                editorType: "dxTextArea",
                editorOptions: {
                    height: 140
                }, validationRules:[{
                    type: "required",
                    message: "Introducir síntomas de paciente."
                },
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres especiales."

                }]
        },{
            dataField: "Presion_Arterial",
            label:{text:"Presión arterial del paciente"},
            editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de presión arterail."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números."

                }]

        }
             ]},{

            itemType: "group",
            caption: "Alergias del paciente",
            colCount: 2,
             items:[
             {
                    itemType: "tabbed",
                    tabPanelOptions: {
                        deferRendering: false
                    },
                    tabs: [
                        
                     {
                        title: "Medicamento",
                        items: [{
                dataField: "AlergiaMedicamento",
                label: { text: "Alergia medicamento" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "valor"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
               dataField: "AlergiaMedicamentoDescripcion",
                label: { text: "Descripción" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: 140
                }, validationRules:[
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres diferentes especiales."

                }
                ]
             }]
                    },{
                        title: "Polvo",
                        items:[{
                dataField: "AlergiaPolvo",
                label: { text: "Alergia Polvo" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "valor"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
               dataField: "AlergiaPolvoDescripcion",
                label: { text: "Descripción" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: 140
                }, validationRules:[
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres especiales."

                }
                ]
             }]
                    },{
                        title: "Alimento",
                        items:[{
                dataField: "AlergiaAlimento",
                label: { text: "Alergia Alimento" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "valor"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
               dataField: "AlergiaAlimentoDescripcion",
                label: { text: "Descripción" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: 140
                }, validationRules:[
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres especiales."

                }
                ]
             }]
                    },{
                        title:"Prurito",
                        items:[{
                dataField: "AlergiaPrurito",
                label: { text: "Hubo prurito" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "valor"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }] 
                        },{
               dataField: "AlergiaPruritoDescripcion",
                label: { text: "Descripción" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: 200
                }, validationRules:[
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres especiales."

                }
                ]
             }]
                    }, {
                        title: "Otras",
                        items: [{
                dataField: "AlergiaOtra",
                label: { text: "Seleccionar si hubo alguna otra alergia" },
               editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: decision,//CHANGE
                    displayExpr: "Op",
                    valueExpr: "valor"
                },validationRules: [{
                    type: "required",
                    message: "Contestar lo anterior."
                }]
             },{
               dataField: "AlergiaOtraDescripcion",
                label: { text: "Descripción" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: 140
                }, validationRules:[
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres especiales."

                }
                ]
             }]
                    }]
                }]
        },{

            itemType: "group",
            caption: "Recomendaciones al paciente",
            items: [{
            dataField: "Notas",
            label:{text:"Notas"},
                editorType: "dxTextArea",
                editorOptions: {
                    height: "300%",
                    width: "200%"
                }, validationRules:[
                  {
                    type: "required",
                    message: "Introducir alguna recomendación."
                },
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.¿?!¡\\s]+$",
                    message: "No utilizar caracteres especiales."

                }]
        }]
        }

        ]
};
   $scope.formOptionsReceta={
        colCount: 4,
        labelLocation: "top",
        validationGroup: "RecipeData",
        onInitialized: function (e) {
            subformInstanceR = e.component;
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
               dataField: "Recomendaciones",
                label: { text: "Descripción de receta" },
                 editorType: "dxTextArea",
                editorOptions: {
                    height: "100%",
                    width: "90%"
                }, validationRules:[{
                    type:"required",
                    message:"Es necesario introducir una descripción de los medicamentos recetados"
                },
                   {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.¿?!¡\\s]+$",
                    message: "No utilizar caracteres especiales."

                },{
                    type: "stringLength",
                    min: 15,
                    message: "Introducir al menos 15 letras de recomendación"
                }
                ]
             }
        ]
   };
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
        scrolling: {
            mode: "virtual"
        },
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopup",
        }
    };

//popup receta
$scope.visiblePopupR = false;
$scope.showInfoR = function () {
        $scope.visiblePopupR = true;
    };
$scope.popupReceta={
       width: "60%",
        height: "60%",
        contentTemplate: "info",
        showTitle: true,
        title: "Receta médica",
        dragEnabled: false,
        scrolling: {
            mode: "virtual"
        },
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopupR",
        }
}

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
        width: "70%",
        height: "80%",
        contentTemplate: "info",
        showTitle: true,
        title: "Síntomas presentados durante la consulta",
        dragEnabled: false,
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopupS",
        }
    };

//Prueba
$scope.visiblePopupPrueba=false;
$scope.showInfoP=function(){
$scope.visiblePopupPrueba=true;
};
$scope.popupPrueba={
  width: "70%",
    height: "80%",
    showTitle: true,
     contentTemplate: "info",
    title: "Test",
    bindingOptions: {
      visible: "visiblePopupPrueba",
    }
};

//=======================================================


$scope.showFormAuxReceta = {
        text: "Recetar paciente",
        icon: 'lnr lnr-users',
        onClick: function (e) {
           // $scope.showInfoR();
           ReturnMedicineInformation();
           subformInstanceR.resetValues();
           slideFormContainer("block3", "create1");
        }
    };
$scope.showFormAuxClinico={
        text: "Datos clínicos",
        icon: 'lnr lnr-users',
        onClick: function (e) {
           if(clinicos==0){
            subformInstance.resetValues();
          slideFormContainer("block", "create");
           }
            
             else{
                 subformInstance.updateData(gridInstanceClinical.getDataSource()._items[0]);
               slideFormContainer("block", "edit"); 
             }
           
        	/*if(clinicos==0)
            $scope.showInfoC();
            else
            	DevExpress.ui.dialog.alert("Ya se han dado de alta los datos clínicos de este paciente en esta consulta", "¡Atención!");*/
        }
 };
 $scope.showFormAuxSintomas={
 	 text: "Síntomas de paciente",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            if(Sintomas==1){
             subformInstanceP.updateData(gridInstanceSintoma.getDataSource()._items[0]);
             slideFormContainer("block2", "edit2");
            }else{
              slideFormContainer("block2", "create2");
            }
        	
           // $scope.showInfoC();
        }
 }
 $scope.showFormAuxPrueba={
        text: "Prueba",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            $scope.showInfoP();
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
 var Recipes=  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingActualRecipe/"+ConcultaActual.ID_Consultas,
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
 var ClinicalFormInfo =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingClinicalInfo/"+ConcultaActual.ID_Consultas,
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

 var MedicineInfo =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingMedicalInfo",
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
 var SintomaData=new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GetAllSintomaData/"+ConcultaActual.ID_Consultas,
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
          ConcultaActual=e.data; 
          idUsuario=e.data.ID_Paciente;
          Sintomas=e.data.Sintomas1;
          Receta=e.data.Receta;
          if(banderaGrids){
            gridInstanceInfo.refresh();
            gridInstanceInfo.repaint();
            gridInstanceClinical.refresh();
            gridInstanceClinical.repaint();
            gridInstanceRecipes.refresh();
            gridInstanceRecipes.repaint();
            gridInstanceSintoma.refresh();
            gridInstanceSintoma.repaint();
          }else{
            banderaGrids=true;
          }
          clinicos=e.data.Clinicos;
          slideFormContainer('none');
          slideFormContainer('none3');
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
        width: 900,
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
             {caption:"Fecha de consulta", dataField:"startDate", alignment:"center"}
             ],
       showBorders: true
    };
    $scope.dataGridMoreInfoClinical={
      dataSource: ClinicalFormInfo,
         noDataText: "No hay datos clinicos dados de alta; registrarlos en el formulario.",
         onInitialized: function (e) {
            gridInstanceClinical = e.component;
        }, onRowClick: function(e){
            if(clinicos!=0){
                //$scope.showInfoC();
                //slideFormContainer("block", "create");
                subformInstance.updateData(e.data);
                console.log(e.data);
               /* var result = DevExpress.ui.dialog.confirm("Are you sure?", "Confirm changes");
                  result.done(function (dialogResult) {
                      alert(dialogResult);
                            });*/
               slideFormContainer("block", "edit");
                
                //Cloro:req.body.Cloro,CaptacionHierro:req.body.CaptacionHierro,
                //Calcio:req.body.Calcio,Albumina:req.body.Albumina,ID_Consultas:req.body.ID_Consultas};
  
            }
        }, columnChooser: {
            enabled: true,
            title: 'Selección de columna',
            emptyPanelText: 'Se arrastra una comlumna aquí'
        },
        columnAutoWeigth: true,
        columnAutoWidth: true, 
        columns:[
        {caption:"Acido urico",dataField:"AcidoUrico",alignment:"center"},
        {caption:"Urea", dataField:"Urea", alignment:"center"},
        {caption:"Trigliceridos", dataField:"Trigliceridos", alignment:"center"},
        {caption:"Sodio", dataField:"Sodio", alignment:"center"},
        {caption:"Relacion AG", dataField:"RelacionAG", alignment:"center"},
        {caption:"Proteina Total", dataField:"ProteinaTotal", alignment:"center"},
        {caption:"Proteina C",dataField:"ProteinaC"}, 
        {caption:"Potasio",dataField:"Potasio", alignment:"center"}, 
        {caption:"BUN",dataField:"BUN", alignment:"center"}
        ,{caption:"LDH", dataField:"LDH", alignment:"center"}, {caption:"Hierro", dataField:"Hierro", alignment:"center"}, {caption:"Magnesio en sangre", dataField:"MagnesioEnSangre",alignment:"center"},
         {caption:"Glucosa",dataField:"Glucosa",alignment:"center"}, {caption:"Fosforo",dataField:"Fosforo",alignment:"center"},
          {caption:"Creatinina",dataField:"Creatinina",alignment:"center"}, {caption:"Colesterol",dataField:"Colesterol",alignment:"center"},
         {caption:"Cloro", dataField:"Cloro", alignment:"center"}, {caption:"Captacion Hierro", dataField:"CaptacionHierro", alignment:"center"},
        {caption:"Calcio", dataField:"Calcio",alignment:"center"}, {caption:"Albumina",dataField:"Albumina",alignment:"center"}
        ], showBorders: true
    };
    $scope.dataGridMoreInfoRecetado={
         dataSource: Recipes,
         noDataText: "No hay datos de algún medicamento dado de alta.",
         onInitialized: function (e) {
            gridInstanceRecipes = e.component;
            }, onRowClick: function(e){
            console.log(e.data);
            subformInstanceR.updateData(e.data);
            ReturnMedicineInformation();
            slideFormContainer("block3", "edit1");
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
             { caption: "Medicamentos recetados", dataField: "Nombre_cantidad",alignment: 'center' },
             { caption: "Recomendaciones de uso", dataField: "Recomendaciones",alignment: 'center' },{
                dataField: "Eliminar",
                cellTemplate: function (container, e) {
                    $("<div>")
                        .append('<button class="btn btn-default"> <i class="fa fa-trash"></i></button>').on('click', function (evt) {
                            var result = DevExpress.ui.dialog.confirm("¿Se requiere eliminar este registro?", "Se necesita una confirmación...");
                            result.done(function (dialogResult) {
                                if (dialogResult == true) {
                                  DeleteMedicine(e.data.idRecetado);
                                   gridInstanceRecipes.refresh();
                                   gridInstanceRecipes.repaint();
                                   // DeleteEmployee(e.data.EmployeeId, e.data.Name, e.data.PaternalLastName, e.data.MaternalLastName, e.data.CompanyId, e.data.SmartFlowTagId, e.data.NoEmployee);
                                }
                            
                            });
                           

                        })
                        .appendTo(container);
                },alignment:"center"

            }
             ],
         showBorders: true
    }
    $scope.dataGridMoreInfoSintoma={
     dataSource: SintomaData,
     noDataText: "No hay datos añadidos.",
     onInitialized: function (e) {
            gridInstanceSintoma = e.component;
            },onRowClick: function(e){
                subformInstanceP.updateData(e.data);
                 slideFormContainer("block2", "edit2");
            },groupPanel: {
            emptyPanelText: "Agrupar",
            visible: "true"
          }, columns: [
             {caption:"Sintomas", dataField:"Sintomas",alignment: 'center'},
             {caption:"Notas", dataField:"Notas",alignment: 'center'},
             {caption:"Fecha", dataField:"Fecha",alignment: 'center'},
             {caption:"Alergia algún alimento", dataField:"AlergiaAlimento",alignment: 'center'},
             {caption:"Alergia algún medicamento", dataField:"AlergiaMedicamento",alignment: 'center'},
             {caption:"Alergia polvo", dataField:"AlergiaPolvo",alignment: 'center'},
             {caption:"Hubo prurito", dataField:"AlergiaPrurito",alignment: 'center'},
             {caption:"Otra alergia", dataField:"AlergiaOtra",alignment: 'center'}
          ]
     }
//=======================================================
//====================Botones============================
//Clínicos
$scope.SfButtonCreateClinic={
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "ClinicData",
        onClick: function () {
               /*  var data = subformInstance.option("formData"), bandera = true;
                  data.ID_Consultas=ConcultaActual.ID_Consultas;
                data.ID_Cita=ConcultaActual.ID_Cita;
                data.startDate=ConcultaActual.startDate;
                data.endDate=ConcultaActual.endDate;
                data.Fecha=ConcultaActual.Fecha;
                InsertingClinicalInfo(data);*/
               //  console.log(data);
            if (subformInstance.validate().isValid) {
                var data = subformInstance.option("formData"), bandera = true;
                data.ID_Consultas=ConcultaActual.ID_Consultas;
                data.ID_Cita=ConcultaActual.ID_Cita;
                data.startDate=ConcultaActual.startDate;
                data.endDate=ConcultaActual.endDate;
                data.Fecha=ConcultaActual.Fecha;
                console.log(data);
                InsertingClinicalInfo(data);
                //UpdateSchechGrid();
                gridInstanceClinical.refresh();
                gridInstanceClinical.repaint();
                subformInstance.resetValues();
                clinicos=1;
                slideFormContainer('none');
               
               
            }
        }
    };
$scope.SfButtonUpdateClinic={
        text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "ClinicData",
        onClick: function () {
          if(subformInstance.validate().isValid){
            var data = subformInstance.option("formData");
            var result = DevExpress.ui.dialog.confirm("¿Se encuentra seguro de querer actualizar datos clínicos?", "Confirmar cambios");
                  result.done(function (dialogResult) {
                      //alert(dialogResult);
                    if (dialogResult) {
                    UpdateClinicalInfo(data);
                    gridInstanceClinical.refresh();
                    gridInstanceClinical.repaint();
                    slideFormContainer('none');
                      }
                });
          }
        }
};
//OtherData
$scope.SfButtonCreateSintomas={
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "SintomasData",
        onClick: function () {
            if (subformInstanceP.validate().isValid) {
                var data = subformInstanceP.option("formData"), bandera = true;
                
                data.ID_Consultas=ConcultaActual.ID_Consultas;
                data.Fecha=ConcultaActual.startDate;
                console.log(data);
               NewSintomaData(data);
               Sintomas=1;
               gridInstanceSintoma.refresh();
               gridInstanceSintoma.repaint();
               //slideFormContainer('none2');
               
            }
        }
    };
$scope.SfButtonUpdateSintomas={
    text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "SintomasData",
        onClick: function () {
            if (subformInstanceP.validate().isValid) {
                var data = subformInstanceP.option("formData"), bandera = true;
                console.log(data);
               UpdateSintomaData(data);
            gridInstanceSintoma.refresh();
            gridInstanceSintoma.repaint();
            }
        }
}
//Recetas
$scope.SfButtonCreateR={
    text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "RecipeData",
        onClick: function () {
            if (subformInstanceR.validate().isValid) {
                var data = subformInstanceR.option("formData"), bandera = true;
                data.idConsulta=ConcultaActual.ID_Consultas;
                console.log(data);
                InsertingRecipes(data);
                gridInstanceRecipes.refresh();
                gridInstanceRecipes.repaint();
                subformInstanceR.resetValues();
                Receta=1;
               
            }
        }
};
$scope.SfButtonUpdateR={
    text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "RecipeData",
        onClick: function () {
            if (subformInstanceR.validate().isValid) {
                var data = subformInstanceR.option("formData"), bandera = true;
                console.log(data);
               UpdatingRecipes(data);
                gridInstanceRecipes.refresh();
                gridInstanceRecipes.repaint();
               subformInstanceR.resetValues();
            }
        }
}
//Más información
//=======================================================
//Apoyo
function UpdateSchechGrid(){
      gridInstanceSchet.refresh();
      gridInstanceSchet.repaint();
}
async function ReturnClinicalData(idConsulta){

       var dataToForm = $.ajax({

              type: 'GET',

              url: "http://localhost:3000/Healty/GettingClinicalInfo/"+idConsulta,

              async: false,

            dataType: "json",

           

           success: function (data) {

              return data;

           },

            error: function (xhr, type, exception) {

                // Do your thing

            }

        });
               return dataToForm.responseJSON;
}
  
async function ReturnMedicineInformation(){
    var dataToForm = $.ajax({

              type: 'GET',

               url: "http://localhost:3000/Healty/GettingMedicalInfo",

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

              subformInstanceR._editorInstancesByField.ID_Medicamento.option("items", Medicines);

               }catch(error){

               }}

//PRUEBAS
$scope.pruebaScrollView={
             height: '100%',
             width: '100%',
             direction: 'both'
};



});