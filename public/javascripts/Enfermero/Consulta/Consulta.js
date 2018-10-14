var ConsultaApp = angular.module('ConsultaApp', ['dx']), gridInstanceSchet=null, subformInstance,extraMedico,extraPaciente;
ConsultaApp.controller('ConsultaController', function DemoController($scope,$http) {

//=====================Formularios================

$scope.formOptions = {
        colCount: 4,
        labelLocation: "top",
        validationGroup: "employeesData",
        onInitialized: function (e) {
            subformInstance = e.component;
        },
        items: [
             {//inicio datafield de compañia
                dataField: "IdUsuario",
                label: { text: "Correo de médico a agendar" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items:HealtyInformation ,
                    displayExpr: "NameEmailH",
                    valueExpr: "IdUsuario",
                },
                validationRules: [{

                    type: "required",
                    message: "Seleccionar un correo de médico a agendar."
                }]//fin de reglas de validación de compañía
            }, {//inicio datafield de compañia
                dataField: "ID_Paciente",
                label: { text: "Correo de paciente a agendar" },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "Seleccionar...",
                    noDataText: "No hay datos para mostrar.",
                    searchEnabled: true,
                    items: PatientsInformation,
                    displayExpr: "NameEmailP",
                    valueExpr: "ID_Paciente",
                },
                validationRules: [{

                    type: "required",
                    message: "Seleccionar un correo de paciente a agendar."
                }]//fin de reglas de validación de compañía
            },
            {
                    dataField: "Fecha",
                    label: {text:"Fecha de consulta"},
                    editorType: "dxDateBox",
                    editorOptions: {
                        width: "100%",
                        type:"datetime"
                    }, customFormat: {
                     type: "date"

                     },validationRules:[{
                    type: "required",
                    message: "Introducir fecha de consulta."
                }]
                }
        ]
    };

//================================================
//=====================Peticiones=================
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
                url: "http://localhost:3000/Nurse/GetAllSchechDates",
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
//================================================
//=======================DataGrids================

$scope.dataGridOptions = {
        dataSource: Schetch,
         onInitialized: function (e) {
            gridInstanceSchet = e.component;
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
       columns: [{ caption: "Médico", dataField: "Nombre_Usuario",alignment: 'center' },
             { caption: "Nombre del paciente", dataField: "Nombre_Paciente",alignment: 'center' },
             { caption: "Apellido paterno paciente", dataField: "Apellido_Paterno_paciente",alignment: 'center' },
             {caption:"Apellido materno paciente", dataField:"Apellido_Materno_paciente",alignment:"center"},
             {caption:"Correo del paciente", dataField:"Correo_paciente", alignment:"center"},
            
             {
                dataField: "Edición",
                cellTemplate: function (container, options) {
                    $("<div>")
                        .append('<button class="btn btn-default" ><i class="fa fa-floppy-o" aria-hidden="true"></i></button>').on('click', function (evt) {
                            console.log(options.data);
                            slideFormContainer("block", "edit");
                            // PatientsInformation[index].NameEmail=element.Nombre_Usuario+" "+element.Correo_usuario;
                            var DataToUpdateForm=options.data;
                            DataToUpdateForm.NameEmailP=options.data.Nombre_Paciente+" "+options.data.Correo_paciente;
                            DataToUpdateForm.NameEmailH=options.data.Nombre_Usuario+" "+options.data.Correo_usuario;
                            refreshingHealtyBox();
                            refreshingPatientsBox();
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

//================================================
//FUNCIONES PARA FORMULARIOS Y SUBFORMULARIOS
//Inserting data into the healty box every time tahts is necessary

DevExpress.localization.loadMessages(

{

    en: { "Done": "Listo" }

}

);
function refreshingHealtyBox(){
    var dataToGrid = $.ajax({

              type: 'GET',

              url: "http://localhost:3000/Nurse/GetAllHealty",

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
                HealtyInformation=dataToGrid.responseJSON;
                //Here we create a json property, wich have the porpose of indicate Name of the healty personal with an email
                HealtyInformation.forEach(function(element, index, array) {
                HealtyInformation[index].NameEmailH=element.Nombre_Usuario+" "+element.Correo_usuario;
               
        });
                subformInstance._editorInstancesByField.IdUsuario.option("items", HealtyInformation);
 }
 //Inserting data into the patients box every time that is necessary
 function refreshingPatientsBox(){
    var dataToGrid = $.ajax({

              type: 'GET',

              url: "http://localhost:3000/Nurse/GetAllPatients",

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
                PatientsInformation=dataToGrid.responseJSON;
                //Here we create a json property, wich have the porpose of indicate Name of the healty personal with an email
                PatientsInformation.forEach(function(element, index, array) {
                PatientsInformation[index].NameEmailP=element.Nombre_Usuario+" "+element.Correo_usuario;
               
        });
                subformInstance._editorInstancesByField.ID_Paciente.option("items", PatientsInformation);
 }
$scope.showFormAux = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            subformInstance.resetValues();
            refreshingHealtyBox();
            refreshingPatientsBox();
           slideFormContainer("block", "create");
        }
    };
//==========================================================================================
//============================Botones formulario principal==================================
$scope.SfButtonCreate= {
        text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "employeesData",
        onClick: function () {
            
            if (subformInstance.validate().isValid) {
                var data = subformInstance.option("formData"), bandera = true;
                data.FechaT=moment(data.Fecha).add(1, 'hour')._d;
                SchechtNewMedicalAppointment(data);
                gridInstanceSchet.refresh();
                gridInstanceSchet.repaint();
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
                  data.FechaT=moment(data.Fecha).add(1, 'hour')._d;
                  UpdateMedicalAppointment(data);
                  gridInstanceSchet.refresh();
                  gridInstanceSchet.repaint();
                 
            }
        }
    };
//======================================================




});