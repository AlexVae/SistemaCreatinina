var RegistroApp = angular.module('RegistroApp', ['dx']);
RegistroApp.controller('RegistroController', function DemoController($scope) {
	var formInstanceLogin;
	//Formulario
	$scope.formOptions = {
        formData: LoginFormData,
		labelLocation: "top",
		validationGroup: "LoginData",
        onInitialized: function(e) {
            formInstanceLogin = e.component;
        },
        items: [{
            itemType: "group",
            caption: "Inicio de sesión",
			
            items: [{
                dataField: "Nombre_Usuario",
                label: { text: "Nombre de usuario" },
				
				editorOptions : {
                    maxLength: '15'
					//placeholder:"Nombre de usuario"
					//readOnly: true
                },
                validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción del nombre de usuario"
                },{
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9]+$",
                    message: "No utilizar caracteres diferentes a letras o números en el usuario a registrar"

                },{
                    type: "stringLength",
                    min: 4,
                    message: "Introducir  mínimo 4 caracteres del nombre de usuario."
                }]
            },{
				dataField: "Contrasena",
                label: { text: "Contraseña" },
				editorOptions : {
                    maxLength: '15',
					mode: 'password'
                }, validationRules: [{
                    type: "required",
                    message: "Se requiere la introducción de contraseña."
                },{
                    type: "pattern",
                    pattern: "^[a-zA-ZñÑóÓáÁéÉíÍúÚ0-9]+$",
                    message: "No utilizar caracteres diferentes a letras o números en la contraseña introducida"

                },{
                    type: "stringLength",
                    min: 4,
                    message: "Introducir  4 caracteres de contraseña de usuario como mínimo ."
                }]
				
			}]
        }]
	
    };
	
	//Botones
	 $scope.SfButtonCreate= {
		text: "Inicio de sesión",
        type: "success",
        useSubmitBehavior: true,
        validationGroup: "LoginData",
        onClick: function () {
			
            if (formInstanceLogin.validate().isValid) {
                var data = formInstanceLogin.option("formData"), bandera = true;
				//console.log(data);
                var consulta=existencia(data);
                if(consulta){
                    NotificationSuccess("Inicio correcto de sesión: "+  data.Nombre_Usuario );
                } else{
                    alert("Inicio de sesión negativo");
                }
               /* if(data.UserName==consulta.UserName && data.Pass==consulta.Pass){
				DevExpress.ui.dialog.alert("Bienvenido, "+consulta.UserName, "Buen día");	
				}else if(data.UserName=="Paciente" && data.Password=="Paciente"){
				DevExpress.ui.dialog.alert("Bienvenido, Paciente.", "Prueba");	
				}else{
					DevExpress.ui.dialog.alert("Claves de inicio erroneas.", "Prueba");
				}*/
            }
        }
    };
	});