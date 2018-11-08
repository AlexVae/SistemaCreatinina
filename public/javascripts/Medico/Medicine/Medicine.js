var MedicineApp = angular.module('MedicineApp', ['dx']), subformInstanceMedicine,gridInstanceMedicine;
MedicineApp.controller('MedicineController', function DemoController($scope,$http) {
	//================================Formulario=================================
	  $scope.formOptionsMedicine={
	  	  colCount: 4,
        labelLocation: "top",
        validationGroup: "MedicineData",
        onInitialized: function (e) {
            subformInstanceMedicine = e.component;
        }, items:[
        {
        	dataField: "Nombre",
                label: { text: "Nombre del medicamento" },
                editorOptions : {
                    maxLength: '25'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Introducción del nombre de medicamento."
                },{
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9,.\\s]+$",
                    message: "No utilizar caracteres especiales."

                }]
        },{
        	dataField: "Dosis",
                label: { text: "Dosis del medicamento" },
                editorOptions : {
                    maxLength: '5'
                    //readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Introducción de dosis de medicamento."
                },{
                    type: "pattern",
                    pattern: "^[0-9.mg\\s]+$",
                    message: "No utilizar caracteres especiales."

                }]
        }

        ]

	  };
	//===========================================================================

	//================================Peticiones=================================
	  var Medicines=  new DevExpress.data.CustomStore({
        load: function () {
            //showLoader();
            return $http({
                crossDomain: true,
                type: 'GET',
                headers: {
                    'Content-Type': undefined
                },
                async: false,
                url: "http://localhost:3000/Healty/GettingMedicineInfo",
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

	//==================================Grid=====================================
	  $scope.dataGridOptions={
       dataSource: Medicines,
       onInitialized: function (e) {
            gridInstanceMedicine = e.component;
        },
        onRowClick: function(e){
            console.log(e.data);
            subformInstanceMedicine.updateData(e.data);
            
            slideFormContainer("block", "edit");
           },
         paging: {
            pageSize: 3
        }, searchPanel: {
            placeholder:"Buscar...",
            visible: true,
            highlightCaseSensitive: true
        }, showBorders: true,
         columns:[{ caption: "Nombre de medicamento", dataField: "Nombre",alignment: 'center' },
                  { caption: "Dosis del medicamento", dataField:"Dosis", alignment:"center"},{
                dataField: "Eliminar",
                cellTemplate: function (container, e) {
                    $("<div>")
                        .append('<button class="btn btn-default"> <i class="fa fa-trash"></i></button>').on('click', function (evt) {
                            var result = DevExpress.ui.dialog.confirm("¿Se requiere eliminar este registro?", "Se necesita una confirmación...");
                            result.done(function (dialogResult) {
                                if (dialogResult == true) {
                                  DeletingMedicine(e.data.ID_Medicamento);
                                   gridInstanceMedicine.refresh();
                                   gridInstanceMedicine.repaint();
                                   // DeleteEmployee(e.data.EmployeeId, e.data.Name, e.data.PaternalLastName, e.data.MaternalLastName, e.data.CompanyId, e.data.SmartFlowTagId, e.data.NoEmployee);
                                }
                            
                            });
                           

                        })
                        .appendTo(container);
                },alignment:"center"

            }]
	  };
	//===========================================================================

	//==================================Botones==================================
	  $scope.showForm={
      text: "Registrar medicamento",
        icon: 'lnr lnr-users',
        onClick: function (e) {
        	subformInstanceMedicine.resetValues();
            slideFormContainer("block", "create");
        }
	  };
	  $scope.SfButtonCreateMedicine={
	  	text: "Registrar",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "MedicineData",
        onClick: function () {
            if (subformInstanceMedicine.validate().isValid) {
                var data = subformInstanceMedicine.option("formData"), bandera = true;
                data.Dosis=data.Dosis+"mg";
                InsertingMedicines(data);
               gridInstanceMedicine.refresh();
               gridInstanceMedicine.repaint();
               
            }
        }
	  };
	 $scope.SfButtonUpdateMedicine={
       text: "Actualizar",
        type: "default",
        useSubmitBehavior: true,
        validationGroup: "MedicineData",
        onClick: function () {
          if(subformInstanceMedicine.validate().isValid){
            var data = subformInstanceMedicine.option("formData");
            UpdatingMedicines(data);
            gridInstanceMedicine.refresh();
            gridInstanceMedicine.repaint();
          }
        }
	 };
	//===========================================================================
});