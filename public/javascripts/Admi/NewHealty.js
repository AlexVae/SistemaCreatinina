var RegistroHealtyApp = angular.module('RegistroHealtyApp', ['dx']);
RegistroHealtyApp.controller('RegistroHealtyController', function DemoController($scope,$http) {
    var subformInstance, healtyData,IDUsuarioCache,CedulaCache,correoCache,licenciaCache;

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
                    message: "Introducir el nombre del personal a registrar."
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
                    message: "Introducir el apellido paterno del personal a registrar."
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
                    message: "Es necesario seleccionar género para el personal a registrar"
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
                }

                    , {
                dataField: "Correo_usuario",
                label: { text: "Correo" },
                editorOptions : {
                   placeholder: "Correo@ejemplo.com"
                },
                validationRules: [{
                    type: "pattern",
                    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$",
                    message: "Introducir una dirección de correo electrónico válida, ej: micorreo@ejemplo.com"
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

                }, {
                    type: "stringLength",
                    min: 8,
                    message: "Introducir una contraseña que tenga 8 caracteres."
                }, {
                    type: "stringLength",
                    max: 10,
                    message: "Verificar la longitud de contraseña, solo puede tener 8 caracteres."
                }, {
                    type: "pattern",
                    pattern: "^([A-Za-z0-9]){8}$",//"^[A-Z]{3}+-+[A-Z0-9]{3}$",
                    message: "La contraseña contener 8 caracteres y ningún signo o caracter especial."
                }]

            }, {//inicio datafield de compañia
                dataField: "ID_Tipo",
                label: { text: "Tipo de empleado" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: PersonalData,
                    displayExpr: "Descripcion",
                    valueExpr: "ID_Tipo"
                },
                validationRules: [{

                    type: "required",
                    message: "Es necesario seleccionar un tipo de empleado."
                }]//fin de reglas de validación de compañía
            },{
             dataField: "ID_Cedula_Profesional",
                label: { text: "Cédula profesional del médico" },
                editorOptions : {
                    maxLength: '11'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de la cédula profesional."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en la cédula profesional."

                },{
                    type: "stringLength",
                    min: 11,
                    message: "Introducir  11 números de cédula profesional"
                }]

            },{
             dataField: "Numero_Licencia",
                label: { text: "Número de licencia " },
                editorOptions : {
                    maxLength: '11'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del número de licencia."
                },{
                    type: "pattern",
                    pattern: "^[0-9]+$",
                    message: "No utilizar caracteres diferentes a números en el número de licencia."

                },{
                    type: "stringLength",
                    min: 11,
                    message: "Introducir  11 números  para la licencia"
                }]   
            },{
                dataField: "Nombre_Especialidad",
                label: { text: "Especialidad médica" },
                editorOptions : {
                    maxLength: '20'
                },
                validationRules: [{
                    type: "required",
                    message: "Introducir el nombre de la especialidad a registrar."
                }, {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ\\s]+$",
                    message: "No utilizar caracteres diferentes a letras en el nombre de la especialidad a registrar"

                }, {
                    type: "stringLength",
                    min: 7,
                    message: "Introducir al menos 10 letras del nombre de especialidad a registrar"
                }]
            },{
                dataField: "Descripcion_Especialidad",
                label: { text: "Descripción de la especialidad médica" },
                editorType: "dxTextArea",
                editorOptions : {
                    maxLength: '30'
                },
                validationRules: [ {
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9\\s]+$",
                    message: "No utilizar caracteres diferentes a letras o números en el nombre de la especialidad a registrar"

                }]

            }
        ]
    };
    /////////////////////////////////////////////

//============info en grid========================

var Empleados =  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/GetHealtyInformation/",
                data: { symbol: 'ctsh' },
                dataType: "jsonp",
                jsonpCallback: 'fnsuccesscallback'
            })
                .then(function (response) {
                   // disableLoader();
                     healtyData = response.data;
                     console.log(healtyData);
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

//////////////////////////////////////////////////    
//Datagrid de usuarios
$scope.dataGridOptions = {
        dataSource: Empleados,
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
            fileName: "HistorialDePersonalHospital",
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
             {
             caption: "Sexo", dataField:"Sexo_usuario",alignment:"center"
             },{caption:"Estado civil", dataField:"Estado_Civil_usuario",alignment:"center"},
             {caption:"Teléfono fijo", dataField:"Numero_Telefonico_usuario",alignment:"center"},
             {caption:"Teléfono celular", dataField:"Numero_Celular_usuario", alignment:"center"},
             {caption:"Fecha de nacimiento", dataField:"Fecha_Nacimiento_usuario", alignment:"center"},
             {caption:"Correo", dataField:"Correo_usuario",alignment:"center"},
             {caption:"Contraseña", dataField:"Contrasena",alignment:"center"},
             {caption:"Tipo de empleado", dataField:"Descripcion", alignment:"center"},
             {caption:"Cédula profesional", dataField:"ID_Cedula_Profesional", alignment:"center"},
             {caption:"Número de licencia", dataField:"Numero_Licencia",alignment:"center"},
             {caption:"Especialidad", dataField:"Nombre_Especialidad"},
             {caption:"Descripción especialidad", dataField:"Descripcion_Especialidad",alignment:"center"},
             {
                dataField: "Modificar",
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append('<button class="btn btn-default" ><i class="fa fa-floppy-o" aria-hidden="true"></i></button>').on('click', function (evt) {

                            slideFormContainer("block", "edit");
                            var auxiliar;
                          IDUsuarioCache=options.data.IdUsuario;
                            CedulaCache=options.data.ID_Cedula_Profesional;
                            correoCache=options.data.Correo_usuario;
                            licenciaCache=options.data.Numero_Licencia;
                            subformInstance.updateData(options.data);
                            
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


/////////////////////////////////////////////////
//Botoms
$scope.SfButtonCreate= {
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "employeesData",
        onClick: function () {
            
            if (subformInstance.validate().isValid) {
                var data = subformInstance.option("formData"), bandera = true;
                console.log(data);
                NewHealtyPersonal(data);
                //subformInstance.resetValues();
                 RefreshDatagrid();
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
                   UpdateHealtyPersonalInformation(data,IDUsuarioCache,CedulaCache,correoCache,licenciaCache);
            }
        }
    };

 $scope.showFormAux = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            subformInstance.resetValues();
           slideFormContainer("block", "create");
        }
    };

});
/////////////////////////////////////