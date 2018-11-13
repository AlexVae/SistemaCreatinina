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
                dataField: "Correo_usuario",
                label: { text: "Correo" },
                editorOptions : {
                   placeholder: "Correo@ejemplo.com"
                },
                validationRules: [{
                    type: "pattern",
                    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$",
                    message: "Introducir una dirección de correo electrónico válida, ej: micorreo@ejemplo.com"
                },{
                    type: "required",
                    message: "Se requiere la introducción de correo electrónico."
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
				 console.log(data);
                //=======================
                $.post('http://localhost:3000'+'/loginStart/'+'loginData',data, function (data) {
                  }).done(function (data) {
                    //NotificationSuccess("Inicio correcto de sesión: "+data.UserName );
                    if(data.bandera==false){
                 NotificationError("Claves de acceso erroneas");
                    }else{
                        console.log(data);
                     NotificationSuccess("Inicio correcto de sesión: "+data[0].Correo_usuario);
                    }
                    //return bandera;
                  }).fail(function () {
                     
                  }).always(function () {
                      
                  });
                //=======================
            }
        }
    };









	});