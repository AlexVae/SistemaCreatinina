var AdressFrontServer = 'http://localhost:3000';
var dataSource = [{
    year: "Noviembre",
    smp: 3,
    mmp: 2.26,
    cnstl: 10,
    cluster: 1
}, {
    year: "Diciembre",
    smp: 2.5,
    mmp: 2.56,
    cnstl: 66,
    cluster: 7
}, {
    year: "Enero",
    smp: 1.9,
    mmp: 2.57,
    cnstl: 143,
    cluster: 43
}, {
    year: "Enero",
    smp: 2.6,
    mmp: 1.63,
    cnstl: 127,
    cluster: 210
}, {
    year: "Febrero",
    smp: 1.9,
    mmp: 1.03,
    cnstl: 36,
    cluster: 361
}, {
    year: "Marzo",
    smp: .9,
    mmp: .91,
    cnstl: 3,
    cluster: 406
}];

DevExpress.localization.loadMessages(

{

    en: { "Yes": "Sí","Done": "Listo","Cancel":"Cancelar","Today":"Hoy","October":"Octubre" }

}

);

//SE ELIMINA

var edades = ["18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"];

var StudentsformData = {
    "Name": "",
    "LastNames": "",
    "Age": "",
    "Sex": ""
};

//================

var types = ["spline", "stackedspline", "fullstackedspline"];
//=====================DATA FOR FORMS========================================
var LoginFormData ={
      "Nombre_Usuario":"",
      "Contrasena":""
};
var TypesBloods = [

{ Grupo_Sanguineo: "O+" },

{ Grupo_Sanguineo: "O-" },

{ Grupo_Sanguineo: "A+" },

{ Grupo_Sanguineo: "A-" },

{ Grupo_Sanguineo: "B-" },

{ Grupo_Sanguineo: "B+" },

{ Grupo_Sanguineo: "AB-"},

{ Grupo_Sanguineo: "AB+"}

]
var EmergencyContacts=[],HealtyInformation=[],PatientsInformation=[];
var Etnias=[{Etnia: "Blanca"}, {Etnia:"De color"}];
var Accesos=[{Acceso_Vascular:"Fístula arterio-venosa"},{Acceso_Vascular:"Fístula con prótesis"},{Acceso_Vascular:"Catéter"}];
var sexo=[{Sexo_usuario: "Masculino"},{Sexo_usuario:"Femenino"}];
var civilData=[{Estado_Civil_usuario:"Soltero"},{Estado_Civil_usuario:"Divorciado"},{Estado_Civil_usuario:"Casado"}, {Estado_Civil_usuario:"Viudo"}];
var PersonalData=[{ID_Tipo:1, Descripcion:"Médico"},{ID_Tipo:2, Descripcion:"Enfermero"}];
var Seguros=[];
var Estados= [
  {
    "id": 1,
    Estado: "Aguascalientes"
  },
  {
    "id": 2,
    Estado: "Baja California"
  },
  {
    "id": 3,
    Estado: "Baja California Sur"
  },
  {
    "id": 4,
    Estado: "Campeche"
  },
  {
    "id": 5,
    Estado: "Coahuila"
  },
  {
    "id": 6,
    Estado: "Colima"
  },
  {
    "id": 7,
    Estado: "Chiapas"
  },
  {
    "id": 8,
    Estado: "Chihuahua"
  },
  {
    "id": 9,
    Estado: "Distrito Federal"
  },
  {
    "id": 10,
    Estado: "Durango"
  },
  {
    "id": 11,
    Estado: "Guanajuato"
  },
  {
    "id": 12,
    Estado: "Guerrero"
  },
  {
    "id": 13,
    Estado: "Hidalgo"
  },
  {
    "id": 14,
    Estado: "Jalisco"
  },
  {
    "id": 15,
    Estado: "México"
  },
  {
    "id": 16,
    Estado: "Michoacán"
  },
  {
    "id": 17,
    Estado: "Morelos"
  },
  {
    "id": 18,
    Estado: "Nayarit"
  },
  {
    "id": 19,
    Estado: "Nuevo León"
  },
  {
    "id": 20,
    Estado: "Oaxaca"
  },
  {
    "id": 21,
    Estado: "Puebla"
  },
  {
    "id": 22,
    Estado: "Querétaro"
  },
  {
    "id": 23,
    Estado: "Quintana Roo"
  },
  {
    "id": 24,
    Estado: "San Luis Potosí"
  },
  {
    "id": 25,
    Estado: "Sinaloa"
  },
  {
    "id": 26,
    Estado: "Sonora"
  },
  {
    "id": 27,
    Estado: "Tabasco"
  },
  {
    "id": 28,
    Estado: "Tamaulipas"
  },
  {
    "id": 29,
    Estado: "Tlaxcala"
  },
  {
    "id": 30,
    Estado: "Veracruz"
  },
  {
    "id": 31,
    Estado: "Yucatán"
  },
  {
    "id": 32,
    Estado: "Zacatecas"
  }
];
//===========================================================================

//================================SUPPORT FUNCTIONS==========================


function NotificationSuccess(message) {

    DevExpress.ui.notify({

        message: message,

        width: 600,

        position: {

            my: "right top",

            at: "right top",

        }

    }, "success", 2000);

}
function NotificationError(message) {

    DevExpress.ui.notify({

        message: message,

        width: 600,

        position: {

            my: "right top",

            at: "right top",

        }

    }, "error", 2000);

}

function slideFormContainer(display, action) {

    if (action == "edit") {

        $('.SfButtonCreate').hide();

        $('.SfButtonUpdate').show();

    }

    if (action == "create") {

        $('.SfButtonUpdate').hide();

        $('.SfButtonCreate').show();

    }

    if (display == "block") {

        $('.sf-form-container').css('display', display);

        //var length = $('.sf-form-container').length;

        //console.log($('.sf-form-container')[length-1].style.display = display);

        $('.sf-form-container').show(500);

        return;

    }
    if (display == "block1") {

        $('.sf-form-container1').css('display', display);

        //var length = $('.sf-form-container').length;

        //console.log($('.sf-form-container')[length-1].style.display = display);

        $('.sf-form-container1').show(500);

        return;

    }

    if (display == "none") {

        //$('.sf-form-container').css('display', display);

        $('.sf-form-container').hide(500);

        return;

    }

    if (display == "none1") {

        $('.sf-form-container1').hide(500);

        return;

    }

    $('.sf-form-container').slideToggle();
    $('.sf-form-container1').slideToggle();

}


//===========================================================================

//================================LOGIN======================================

async function existencia(loginData){
    console.log(loginData);
 $.post(AdressFrontServer+'/loginStart/'+'loginData',loginData, function (data) {
    }).done(function (data) {
      //NotificationSuccess("Inicio correcto de sesión: "+data.UserName );
      var userOne=data.Nombre_Usuario, userTwo=loginData.Nombre_Usuario;
      console.log(data);
      var bandera=(userOne==userTwo);
      //return bandera;
    }).fail(function () {
       
    }).always(function () {
        
    });

}

//===========================================================================
//==============================ADMIN=======================================

async function NewHealtyPersonal(HealtyData){
   $.post(AdressFrontServer+'/NewHealtyRegistry/'+'HealtyData',HealtyData, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: La cédula y/o correo y/o licencia de usuario estan repetidos");
      }else{
     NotificationSuccess("Registro correcto " +data );
      slideFormContainer('none');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar empleado  " + HealtyData.Nombre_Usuario);

    return false;
    }).always(function () {
        
    }); 
}

async function UpdateHealtyPersonalInformation(HealtyData,IdUsuario,CedulaProfesional,CorreoUsuario,LicenciaUsuario){
   HealtyData.CacheCedula=CedulaProfesional;
   HealtyData.CorreoUsuarioCache=CorreoUsuario;
   HealtyData.LicenciaCache=LicenciaUsuario;
$.post(AdressFrontServer+'/UpdateHealtyPersonalInformation/'+'HealtyData',HealtyData, function (data) {
    }).done(function (data) {
      //NotificationSuccess("Inicio correcto de sesión: "+data.UserName );
      if(data.bandera==true){
      NotificationSuccess("Correcto, datos de personal de salud actualizados");
       slideFormContainer('none');
      }else{
         NotificationError("Error: La cédula y/o correo y/o licencia de usuario estan repetidos");
      }
     
    }).fail(function () {
       
    }).always(function () {
        
    });
}

//===========================================================================
//==============================PATIENT=======================================
async function CreateNewPatient(PatientInfo){
$.post(AdressFrontServer+'/Healty/NewPatientRegistry/'+'PatientInfo',PatientInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: correo de usuario repetido.");
      }else{
      console.log(data);
      NotificationSuccess("Registro de paciente correcto: " +data );
      slideFormContainer('none');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar empleado  " + HealtyData.Nombre_Usuario);

    return false;
    }).always(function () {
        
    }); 
}
async function CreateNewEmergencyContact(EmergencyInfo){
  $.post(AdressFrontServer+'/Healty/NewEmergencyContact/'+'EmergencyInfo',EmergencyInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: número de contacto repetido.");
      }else{
     NotificationSuccess("Registro de contacto de emergencia existoso.");
      slideFormContainer('none1');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar empleado  " + HealtyData.Nombre_Usuario);

    return false;
    }).always(function () {
        
    }); 
}
async function GettingAllEmergencyData(ID){
  var ToFind={ID_Paciente:ID};
   $.post(AdressFrontServer+'/Healty/GetAllEmergencyInformation/'+'ToFind',ToFind, function (data) {
    }).done( function (data) {
        console.log(data);
        subformInstance._editorInstancesByField.ID_Contacto_Emergencia.option("items", data);
        return data;
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}

async function CreatingNewHealtyInfo(HealtyInfo){
  $.post(AdressFrontServer+'/Healty/NewHealtyInformation/'+'HealtyInfo',HealtyInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: número de seguridad social repetido.");
      }else{
     NotificationSuccess("Registro de seguridad registrado.");
      slideFormContainer('none1');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}
//===========================UPDATING=========================================
async function UpdatingPatient(PatientsInfo){
  $.post(AdressFrontServer+'/Healty//UpdatingPatientsInformation/'+'PatientsInfo',PatientsInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: correo de usuario repetido.");
      }else{
      console.log(data);
      NotificationSuccess("Registro de paciente correcto: " +data );
      slideFormContainer('none');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar empleado  " + HealtyData.Nombre_Usuario);

    return false;
    }).always(function () {
        
    }); 

}

async function UpdatingEmergencyContact(EmergencyInfo){
  $.post(AdressFrontServer+'/Healty/UpdatingEmergencyContact/'+'EmergencyInfo',EmergencyInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: número de contacto repetido.");
      }else{
     NotificationSuccess("Registro de contacto de emergencia existoso.");
      slideFormContainer('none1');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar empleado  " + HealtyData.Nombre_Usuario);

    return false;
    }).always(function () {
        
    }); 
}
//============================================================================
//==================================Nurse=====================================
async function SchechtNewMedicalAppointment(SchechInfo){
    $.post(AdressFrontServer+'/Nurse/NewSchechHealty/'+'SchechInfo',SchechInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: Hora y/o Fecha de consulta erronea");
      }else{
     NotificationSuccess("Registro de consulta correcto.");
      slideFormContainer('none');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}
//============================================================================

