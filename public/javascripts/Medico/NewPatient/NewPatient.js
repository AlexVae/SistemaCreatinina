var RegistroHealtyApp = angular.module('RegistroHealtyApp', ['dx']);
RegistroHealtyApp.controller('RegistroHealtyController', function DemoController($scope,$http) {
    var subformInstance,formInstanceEmergency,formInstanceSafety, healtyData,IDUsuarioCache,CedulaCache,correoCache,licenciaCache,banderaPop=false,Emergency,HealtyInfo,gridInstance=null ,gridInstanceEmergency=null,gridInstanceSafety=null,IdEmergencia=0;
/*setInterval(function(){ gridInstance.refresh();
                gridInstance.repaint(); }, 3000);*/
    //Formulario de registro nuevo personal de salud
$scope.formOptions = {
        colCount: 4,
        labelLocation: "top",
        validationGroup: "employeesData",
        onInitialized: function (e) {
            subformInstance = e.component;
        },
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
            }, {
                dataField: "Apellido_Paterno_usuario",
                label: { text: "Apellido Paterno" },
                editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el apellido paterno del paciente a registrar."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del apellido paterno a registrar"
                }]//fin de las reglas de validación de los apellidos
            }, { //fin dataField de los apellidos
                dataField: "Apellido_Materno_usuario",
                label: { text: "Apellido Materno" },
                 editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el apellido materno a registrar."

                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del apellido materno a registrar"
                }]//fin de reglas de validación de el apellido materno
            }, {//inicio datafield de compañia
                dataField: "Sexo_usuario",
                label: { text: "Sexo" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: sexo,
                    displayExpr: "Sexo_usuario",
                    valueExpr: "Sexo_usuario"

                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar género para el paciente a registrar"
                }]//fin de reglas de validación de compañía
            }, {
                dataField: "Estado_Civil_usuario",
                label: { text: "Estado civil" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: civilData,
                    displayExpr: "Estado_Civil_usuario",
                    valueExpr: "Estado_Civil_usuario"
                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un estado civil"
                }]


            }, {
                dataField: "Numero_Telefonico_usuario",
                label: { text: "Teléfono fijo" },
                editorOptions : {
                    maxLength: '10'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del número de teléfono fijo."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el teléfono a registrar"

                },{
                    type: "stringLength",
                    min: 10,
                    message: "Introducir  10 números del teléfono a registrar"
                }]
            }, {
                dataField: "Numero_Celular_usuario",
                label: { text: "Teléfono celular" },
                editorOptions : {
                    maxLength: '10'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del número de teléfono celular."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el teléfono a registrar"

                },{
                    type: "stringLength",
                    min: 10,
                    message: "Introducir  10 números del teléfono a registrar"
                }]
            }, {
                    dataField: "Fecha_Nacimiento_usuario",
                    label: {text:"Fecha de nacimiento"},
                    editorType: "dxDateBox",
                    editorOptions: {
                        width: "100%"
                    }, customFormat: {
                     type: "date"

                     },validationRules:[{
                    type: "required",
                    message: "Se requiere la introducción de fecha de nacimiento de usuario."
                }]
                },{
                    dataField: "Estado",
                label: { text: "Estado de origen" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: Estados,
                    displayExpr: "Estado",
                    valueExpr: "Estado"
                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un estado."
                }]
                },{
                    dataField: "Municipio",
                label: { text: "Municipio del paciente" },
                editorOptions : {
                    maxLength: '25'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir municipio del usuario."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del municipio a registrar"
                }]
                },{
                    dataField: "Localidad",
                label: { text: "Localidad de la vivienda" },
                editorOptions : {
                    maxLength: '25'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir localidad del usuario."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras."

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras."
                }]
                },{
                    dataField: "Colonia",
                label: { text: "Colonia de la vivienda" },
                editorOptions : {
                    maxLength: '25'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir colonia del usuario."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras de la colonia a registrar"
                }]
                },{
                    dataField: "Calle",
                label: { text: "Calle de la vivienda" },
                editorOptions : {
                    maxLength: '25'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir la calle del usuario."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras de la calle a registrar"
                }]
                },{
                     dataField: "Num_Interior",
                label: { text: "Número interior de vivienda" },
                editorOptions : {
                    maxLength: '6'
                },
                validationRules: [{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el registro"

                }]

                },{
                    dataField: "Num_Exterior",
                label: { text: "Número exterior de vivienda" },
                editorOptions : {
                    maxLength: '6'
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del número interior."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el registro"

                }]

                },{
                    dataField: "Codigo_Postal",
                label: { text: "Código postal de casa" },
                editorOptions : {
                    maxLength: '6'
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del código postal."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el registro"

                }]
                }

                    , {
                dataField: "Correo_usuario",
                label: { text: "Correo" },
                editorOptions : {
                   placeholder: "Correo@ejemplo.com"
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir correo electrónico."
                },{
                    type: "pattern",
                    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$",
                    message: "Introducir dirección de correo electrónico válida, ej: micorreo@ejemplo.com"
                }]
            }, {//inicia el datafield del número de empleado
                dataField: "Contrasena",
                label: { text: "Contraseña de usuario" },
                placeholder: 'La conseña debe contener máximo 8 caracteres.',
                editorOptions : {
                    maxLength: '10',
                    placeholder: "Máximo 10 caracteres."
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir contraseña a registrar."

                }]},{
                dataField: "Estatura",
                label: { text: "Estatura del pacietne" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de estatura."
                },{
                    type: "pattern",
                    pattern: "^[0-9.]+$",
                    message: "No utilizar caracteres diferentes a números en estatura a registrar"

                },{
                    type: "stringLength",
                    min: 1,
                    message: "Introducir  1 números de estatura a registrar"
                }]
            },{//inicio datafield de compañia
                dataField: "Grupo_Sanguineo",
                label: { text: "Tipo de sangre" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: TypesBloods,
                    displayExpr: "Grupo_Sanguineo",
                    valueExpr: "Grupo_Sanguineo",
                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un tipo de sangre."
                }]//fin de reglas de validación de compañía
            },{//inicio datafield de compañia
                dataField: "Etnia",
                label: { text: "Etnia" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: Etnias,
                    displayExpr: "Etnia",
                    valueExpr: "Etnia",
                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar una etnia."
                }]//fin de reglas de validación de compañía
            },{//inicio datafield de compañia
                dataField: "Acceso_Vascular",
                label: { text: "Acceso vascular del paciente" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: Accesos,
                    displayExpr: "Acceso_Vascular",
                    valueExpr: "Acceso_Vascular",
                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un tipo de acceso vascular."
                }]//fin de reglas de validación de compañía
            },
            {//inicio datafield de compañia
                dataField: "ID_Contacto_Emergencia",
                label: { text: "Contacto de Emergencia principal" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: EmergencyContacts,//CHANGE
                    displayExpr: "NameFamily",
                    valueExpr: "ID_Contacto_Emergencia", dropDownButtonTemplate: function (fut) {
                        return $("<button >", { class: "lnr lnr-user" }).on('click', function (evt) {
                         //   formInstance.resetValues();
                         if(banderaPop){
                             $scope.showInfo();
                         }else{
                            DevExpress.ui.dialog.alert("Para dar de alta un contacto de emergencia se debe de dar de alta el paciente primero", "Error.");
                         
                         }
                           
                             
                        })
                    }
                }/*,
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un departamento."
                }]*///fin de reglas de validación de compañía
            },{//inicio datafield de compañia
                dataField: "ID_Numero_Poliza",
                label: { text: "Seguro principal" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: Seguros,//CHANGE
                    displayExpr: "ID_Numero_Poliza",
                    valueExpr: "ID_Numero_Poliza", dropDownButtonTemplate: function (fut) {
                        return $("<button >", { class: "lnr lnr-inbox" }).on('click', function (evt) {
                         //   formInstance.resetValues();
                         if(banderaPop){
                            $scope.showInfoSafety();
                         }else{
                            DevExpress.ui.dialog.alert("Para dar de alta un seguro se debe de dar de alta el paciente primero", "Error.");
                         
                         }
                            
                             
                        })
                    }
                }/*,
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un departamento."
                }]*///fin de reglas de validación de compañía
            }
        ]
    };
    /////////////////////////////////////////////SUB-Catálogo de contacto de emergencia
$scope.visiblePopup = false;
$scope.showInfo = function () {
        $scope.visiblePopup = true;
    };
$scope.popupEmergency = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Crear contacto de emergencia",
        dragEnabled: false,
       // closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopup",
        }
    };
 $scope.EmergencyForm = {
        colCount: 4,
        labelLocation: "top",
        validationGroup: "EmergencyForm",
        onInitialized: function (fut) {
            formInstanceEmergency = fut.component;
        },
        items: [{

                dataField: "Nombre",
                label: { text: "Nombre de contacto de emergencia" },
                editorOptions : {
                    maxLength: '25'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir nombre contacto de emergencia."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar."

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del nombre a registrar"
                }]
            },{
                dataField: "Apellido_Paterno",
                label: { text: "Apellido Paterno contacto de emergencia" },
                editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el apellido paterno de contacto de emergencia."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del apellido paterno a registrar"
                }]//fin de las reglas de validación de los apellidos
            },{
                dataField: "Apellido_Materno",
                label: { text: "Apellido Materno contacto de emergencia" },
                editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el apellido materno a registrar."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del apellido materno a registrar"
                }]//fin de las reglas de validación de los apellidos
            },{
                dataField: "Numero_Telefonico",
                label: { text: "Teléfono contacto de emergencia" },
                editorOptions : {
                    maxLength: '10'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del número de teléfono fijo."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el teléfono a registrar"

                },{
                    type: "stringLength",
                    min: 10,
                    message: "Introducir  10 números del teléfono a registrar"
                }]
            },{
                dataField: "Numero_Celular",
                label: { text: "Número celular contacto emergencia" },
                editorOptions : {
                    maxLength: '10'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del número de celular."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el teléfono a registrar"

                },{
                    type: "stringLength",
                    min: 10,
                    message: "Introducir  10 números del teléfono a registrar"
                }]
            },{
                dataField: "Parentesco_Paciente",
                label: { text: "Parentesco con paciente" },
                editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir parentesco de contacto de emergencia"
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras."

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras"
                }]//fin de las reglas de validación de los apellidos
            }
        ]
    };
////////////////////////////////////////////////Subcatálogo de información de aseguradora
$scope.visiblePopupSafety = false;
$scope.showInfoSafety = function () {
        $scope.visiblePopupSafety = true;
    };
$scope.popupSafetyInformation = {
        width: "90%",
        height: "90%",
        contentTemplate: "info",
        showTitle: true,
        title: "Números de seguro al paciente",
        dragEnabled: false,
       // closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopupSafety",
        }
    };
$scope.SafetyForm = {
        colCount: 4,
        labelLocation: "top",
        validationGroup: "SafetyForm",
        onInitialized: function (futo) {
            formInstanceSafety = futo.component;
        },
        items: [{

                dataField: "ID_Numero_Poliza",
                label: { text: "Número de seguridad social" },
                editorOptions : {
                    maxLength: '12'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el número de seguridad social."
                }, {
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números."

                }, {
                    type: "stringLength",
                    min: 12,
                    message: "Introducir al menos 12 números"
                }]
            },{
                dataField: "Nombre_Seguradora",
                label: { text: "Nombre de la aseguradora" },
                editorOptions : {
                    maxLength: '30'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el nombre de la aseguradora."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre a registrar"

                }, {
                    type: "stringLength",
                    min: 4,
                    message: "Introducir al menos 4 letras del nombre a registrar"
                }]//fin de las reglas de validación de los apellidos
            },{
                dataField: "Cobertura_Seguradora",
                label: { text: "Cobertura de la aseguradora" },
                editorType: "dxTextArea",
                editorOptions : {
                    maxLength: '100'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir cobertura."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres diferentes a letras o números"

                }, {
                    type: "stringLength",
                    min: 15,
                    message: "Introducir al menos 15 letras en cobertura"
                }]//fin de las reglas de validación de los apellidos
            }
        ]
    };
/////////////////////////////////////////////////Sacamos la información 
var Patients =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GetAllPatientsInformation/",
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // disableLoader();
                     console.log(response.data);
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
var EmergencyContactsPatient =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingEmergency/"+IdEmergencia,
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // disableLoader();
                     Emergency=response.data;
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
var SafetyPatientsInformation =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingSafety/"+IdEmergencia,
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // disableLoader();
                     HealtyInfo=response.data;
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
///////////////////////////////////////////////////////Grids de la vista
//Grid Principal
$scope.dataGridOptions = {
        dataSource: Patients,
         onInitialized: function (e) {
            gridInstance = e.component;
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
            fileName: "HistorialDePacientesHospital",
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
       columns: [{ caption: "Nombre", dataField: "Nombre_Usuario",alignment: 'center' },
             { caption: "Apellido Paterno", dataField: "Apellido_Paterno_usuario",alignment: 'center' },
             { caption: "Apellido Materno", dataField: "Apellido_Materno_usuario",alignment: 'center' },
             {caption:"Teléfono fijo", dataField:"Numero_Telefonico_usuario",alignment:"center"},
             {caption:"Celular", dataField:"Numero_Celular_usuario", alignment:"center"},
             {caption:"Correo", dataField:"Correo_usuario",alignment:"center"},
             {
                dataField: "Más información o modificar datos",
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append('<button class="btn btn-default" ><i class="fa fa-floppy-o" aria-hidden="true"></i></button>').on('click', function (evt) {

                            slideFormContainer("block", "edit");
                            var auxiliar;
                            //

                            subformInstance.updateData(options.data);
                            IdEmergencia=options.data.ID_Paciente;
                            refreshingEmergencyBox();
                            refreshingHealtyBox();
                            banderaPop=true;
                            try{
                            gridInstanceEmergency.refresh();
                            gridInstanceEmergency.repaint();
                            gridInstanceSafety.refresh();
                            gridInstanceSafety.repaint();
                            }catch(err){
          
                            }
                            
                            //
                          /*var Emergency= GettingAllEmergencyData(options.data.ID_Paciente);
                           console.log(Emergency);

                            subformInstance._editorInstancesByField.ID_Contacto_Emergencia.option("items", Emergency);
                           //console.log(options.data);
                            subformInstance.updateData(options.data);*/
                          
                            
                        })
                        .appendTo(container);
                },alignment:"center"

            }, {
                dataField: "Eliminar",
                cellTemplate: function (container, e) {
                    $("<div>")
                        .append('<button class="btn btn-default"> <i class="fa fa-trash"></i></button>').on('click', function (evt) {
                            var result = DevExpress.ui.dialog.confirm("¿Se requiere eliminar este registro?", "Se necesita una confirmación...");
                            result.done(function (dialogResult) {
                                if (dialogResult == true) {
                                    DeleteEmployee(e.data.EmployeeId, e.data.Name, e.data.PaternalLastName, e.data.MaternalLastName, e.data.CompanyId, e.data.SmartFlowTagId, e.data.NoEmployee);
                                }
                            
                            });
                           

                        })
                        .appendTo(container);
                },alignment:"center"

            }],
       showBorders: true
    };
//Grid Emergency
$scope.dataGridEmergency = {
        dataSource: EmergencyContactsPatient,
         onInitialized: function (e) {
            gridInstanceEmergency = e.component;
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
       columns: [{ caption: "Nombre", dataField: "Nombre",alignment: 'center' },
             { caption: "Apellido Paterno", dataField: "Apellido_Paterno",alignment: 'center' },
             { caption: "Apellido Materno", dataField: "Apellido_Materno",alignment: 'center' },
             {caption:"Teléfono fijo", dataField:"Numero_Telefonico",alignment:"center"},
             {caption:"Teléfono celular", dataField:"Numero_Celular", alignment:"center"},
            
             {
                dataField: "Más información o modificar datos",
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append('<button class="btn btn-default" ><i class="fa fa-floppy-o" aria-hidden="true"></i></button>').on('click', function (evt) {

                            slideFormContainer("block1", "edit");
                            var auxiliar;
                            
                            formInstanceEmergency.updateData(options.data);
                          /*var Emergency= GettingAllEmergencyData(options.data.ID_Paciente);
                           console.log(Emergency);

                            subformInstance._editorInstancesByField.ID_Contacto_Emergencia.option("items", Emergency);
                           //console.log(options.data);
                            subformInstance.updateData(options.data);*/
                          
                            
                        })
                        .appendTo(container);
                }

            }, {
                dataField: "Eliminar",
                cellTemplate: function (container, e) {
                    $("<div>")
                        .append('<button class="btn btn-default"> <i class="fa fa-trash"></i></button>').on('click', function (evt) {
                            var result = DevExpress.ui.dialog.confirm("¿Se requiere eliminar este registro?", "Se necesita una confirmación...");
                            result.done(function (dialogResult) {
                                if (dialogResult == true) {
                                    DeleteEmployee(e.data.EmployeeId, e.data.Name, e.data.PaternalLastName, e.data.MaternalLastName, e.data.CompanyId, e.data.SmartFlowTagId, e.data.NoEmployee);
                                }
                            
                            });
                           

                        })
                        .appendTo(container);
                }

            }],
       showBorders: true
    };

//Grid Safety
$scope.dataGridSafety = {
        dataSource: SafetyPatientsInformation,
         onInitialized: function (e) {
            gridInstanceSafety = e.component;
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
       columns: [{ caption: "Poliza de seguro", dataField: "ID_Numero_Poliza",alignment: 'center' },
             { caption: "Aseguradora", dataField: "Nombre_Seguradora",alignment: 'center' },
             { caption: "Cobertura aportada", dataField: "Cobertura_Seguradora",alignment: 'center' },
            
             {
                dataField: "Más información o modificar datos",
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append('<button class="btn btn-default" ><i class="fa fa-floppy-o" aria-hidden="true"></i></button>').on('click', function (evt) {

                            slideFormContainer("block1", "edit");
                            var auxiliar;
                            
                            formInstanceSafety.updateData(options.data);
                          /*var Emergency= GettingAllEmergencyData(options.data.ID_Paciente);
                           console.log(Emergency);

                            subformInstance._editorInstancesByField.ID_Contacto_Emergencia.option("items", Emergency);
                           //console.log(options.data);
                            subformInstance.updateData(options.data);*/
                          
                            
                        })
                        .appendTo(container);
                }

            }, {
                dataField: "Eliminar",
                cellTemplate: function (container, e) {
                    $("<div>")
                        .append('<button class="btn btn-default"> <i class="fa fa-trash"></i></button>').on('click', function (evt) {
                            var result = DevExpress.ui.dialog.confirm("¿Se requiere eliminar este registro?", "Se necesita una confirmación...");
                            result.done(function (dialogResult) {
                                if (dialogResult == true) {
                                    DeleteEmployee(e.data.EmployeeId, e.data.Name, e.data.PaternalLastName, e.data.MaternalLastName, e.data.CompanyId, e.data.SmartFlowTagId, e.data.NoEmployee);
                                }
                            
                            });
                           

                        })
                        .appendTo(container);
                }

            }],
       showBorders: true
    };

//============================Botones formulario principal==================================
$scope.SfButtonCreate= {
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "employeesData",
        onClick: function () {
            
            if (subformInstance.validate().isValid) {
                var data = subformInstance.option("formData"), bandera = true;
                data.Fecha_Nacimiento_usuario=moment(data.Fecha_Nacimiento_usuario).format('MM-DD-YYYY HH:mm');
                console.log(data);
                CreateNewPatient(data);
                gridInstance.refresh();
                gridInstance.repaint();
               // NewHealtyPersonal(data);
                //subformInstance.resetValues();
                 //RefreshDatagrid();
              //  DevExpress.ui.dialog.alert("Funciono.", "Prueba");
            }
        }
    };
 $scope.SfButtonUpdate = {
        text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "employeesData",
        onClick: function () {
            if (subformInstance.validate().isValid) {
                  var data = subformInstance.option("formData");
                  data.Fecha_Nacimiento_usuario=moment(data.Fecha_Nacimiento_usuario).format('MM-DD-YYYY HH:mm');
                  UpdatingPatient(data);
                  gridInstance.refresh();
                  gridInstance.repaint();
            }
        }
    };
//Botones formulario de registro de contactos de emergencia 
$scope.SfButtonCreateEmergency={
  text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "EmergencyForm",
        onClick: function () {
            
            if (formInstanceEmergency.validate().isValid) {
                var data = formInstanceEmergency.option("formData"), bandera = true;
                data.ID_Paciente=IdEmergencia;
                console.log(data);
                CreateNewEmergencyContact(data);
                gridInstanceEmergency.refresh();
                gridInstanceEmergency.repaint();
                refreshingEmergencyBox();
                 
            }
        }

}

 $scope.SfButtonUpdateEmergency = {
        text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "EmergencyForm",
        onClick: function () {
            if (formInstanceEmergency.validate().isValid) {
                var data = formInstanceEmergency.option("formData"), bandera = true;
                UpdatingEmergencyContact(data);
                gridInstanceEmergency.refresh();
                gridInstanceEmergency.repaint();
                refreshingEmergencyBox();
                
            }
        }
    };

//Botones el sub-catálogo de seguro médico
$scope.SfButtonCreateSafety={
 text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "SafetyForm",
        onClick: function () {
            
            if (formInstanceSafety.validate().isValid) {
                var data = formInstanceSafety.option("formData"), bandera = true;
                data.ID_Paciente=IdEmergencia;
                CreatingNewHealtyInfo(data);
                gridInstanceSafety.refresh();
                gridInstanceEmergency.repaint();
                refreshingHealtyBox();
            }
        }

}

 $scope.SfButtonUpdateSafety = {
        text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "SafetyForm",
        onClick: function () {
            if (formInstanceSafety.validate().isValid) {
                var data = formInstanceSafety.option("formData"), bandera = true;
                alert(data);
                
            }
        }
    };


//=======================================================================================
//FUNCIONES PARA FORMULARIOS Y SUBFORMULARIOS
//Refresh the EmergencyContact once that is changed something
function refreshingEmergencyBox(){
    var dataToGrid = $.ajax({

              type: 'GET',

              url: "http://localhost:3000/Healty/GettingEmergency/"+IdEmergencia,

              async: false,

            dataType: "json",

            data: $(form).serialize(),

           success: function (data) {

              return data;

           },

            error: function (xhr, type, exception) {

                // Do your thing

            }

        });
                Emergency=dataToGrid.responseJSON;
                Emergency.forEach(function(element, index, array) {
                Emergency[index].NameFamily=element.Nombre+" "+element.Parentesco_Paciente;
               
        });
                subformInstance._editorInstancesByField.ID_Contacto_Emergencia.option("items", Emergency);
 }
function refreshingHealtyBox(){
    var dataToGrid = $.ajax({

              type: 'GET',

              url: "http://localhost:3000/Healty/GettingSafety/"+IdEmergencia,

              async: false,

            dataType: "json",

            data: $(form).serialize(),

           success: function (data) {

              return data;

           },

            error: function (xhr, type, exception) {

                // Do your thing

            }

        });
                HealtyInfo=dataToGrid.responseJSON;
                subformInstance._editorInstancesByField.ID_Numero_Poliza.option("items", HealtyInfo);
 }
$scope.showFormAux = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            subformInstance.resetValues();
           slideFormContainer("block", "create");
           banderaPop=false;//Para el control de subcatalogos
        }
    };
$scope.showFormAuxEmergency = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            formInstanceEmergency.resetValues();
           slideFormContainer("block1", "create");
        }
    };
$scope.showFormAuxSafety = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            formInstanceSafety.resetValues();
           slideFormContainer("block1", "create");
        }
    };

});



function RefreshDatagrid() {

    var dataGrid = $('#gridContainer').dxDataGrid('instance');

    dataGrid.refresh();

    dataGrid.repaint();

}
 
/////////////////////////////////////