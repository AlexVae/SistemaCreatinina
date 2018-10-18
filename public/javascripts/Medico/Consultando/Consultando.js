var ConsultaApp = angular.module('ConsultaApp', ['dx']), gridInstanceSchet=null, subformInstance,extraMedico,extraPaciente;
ConsultaApp.controller('ConsultaController', function DemoController($scope,$http) {

//=======================Formulario======================



$scope.showFormAux = {
        text: "Crear nuevo",
        icon: 'lnr lnr-users',
        onClick: function (e) {
            subformInstance.resetValues();
           slideFormContainer("block", "create");
        }
    };
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
//=======================================================

//=======================DataGrid========================
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
       columns: [
             { caption: "Nombre del paciente", dataField: "Nombre_Usuario",alignment: 'center' },
             { caption: "Apellido paterno paciente", dataField: "Apellido_Paterno_usuario",alignment: 'center' },
             {caption:"Apellido materno paciente", dataField:"Apellido_Materno_usuario",alignment:"center"},
             {caption:"Correo del paciente", dataField:"Correo_usuario", alignment:"center"},
             {caption:"Fecha de consulta", dataField:"startDate", alignment:"center"},
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
//=======================================================



});