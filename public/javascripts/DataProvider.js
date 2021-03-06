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
var decision=[{Op:"Si", valor:"Si"},{Op:"No", valor:"No"}];
var types = ["spline", "stackedspline", "fullstackedspline"];
DevExpress.localization.loadMessages(

{

    en: { "Yes": "Sí","Done": "Listo","Cancel":"Cancelar","Today":"Hoy","October":"Octubre", "All day":"Todo el día", "Day":"Día", "Open appointment":"Abrir cita" }

}

);

//SE ELIMINA

var edades = ["18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"];
var dializador=[{dializador:"k+"},{dializador:"Ca++"},{dializador:"Na+"}];
var StudentsformData = {
    "Name": "",
    "LastNames": "",
    "Age": "",
    "Sex": ""
};

var Medicinas=[];

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
var ClinicalInitialData={AcidoUrico:'',Urea:'',Trigliceridos:'',Sodio:'',RelacionAG:'',ProteinaTotal:'',ProteinaC:'',Potasio:'',BUN:'',LDH:'',Hierro:'',Glucosa:'',Globulinas:'',Fosforo:'',Creatinina:'',Colesterol:'',Cloro:'',CaptacionHierro:'',Calcio:'',Albumina:'',ID_Consultas:''};
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
    if (action == "edit1") {

        $('.SfButtonCreate2').hide();

        $('.SfButtonUpdate2').show();

    }
       if (action == "edit2") {

        $('.SfButtonCreate1').hide();

        $('.SfButtonUpdate1').show();

    }
     if (action == "edit3") {

        $('.SfButtonCreate3').hide();

        $('.SfButtonUpdate3').show();

    }
    if (action == "create") {

        $('.SfButtonUpdate').hide();

        $('.SfButtonCreate').show();

    }
    if (action == "create1") {

        $('.SfButtonUpdate2').hide();

        $('.SfButtonCreate2').show();

    }
    if(action == "create2"){
       $('.SfButtonUpdate1').hide();

        $('.SfButtonCreate1').show();
    }
    if(action == "create3"){
       $('.SfButtonUpdate3').hide();

        $('.SfButtonCreate3').show();
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
    if(display  == "block2"){

        $('.sf-form-container2').css('display', display);

        //var length = $('.sf-form-container').length;

        //console.log($('.sf-form-container')[length-1].style.display = display);

        $('.sf-form-container2').show(500);

        return;
    }
    if (display == "block3") {

        $('.sf-form-container3').css('display', display);

        //var length = $('.sf-form-container').length;

        //console.log($('.sf-form-container')[length-1].style.display = display);

        $('.sf-form-container3').show(500);

        return;

    }
     if (display == "block4") {

        $('.sf-form-container4').css('display', display);

        //var length = $('.sf-form-container').length;

        //console.log($('.sf-form-container')[length-1].style.display = display);

        $('.sf-form-container4').show(500);

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
    if (display == "none2") {

        $('.sf-form-container2').hide(500);

        return;

    }
      if (display == "none3") {

        $('.sf-form-container3').hide(500);

        return;

    }
      if (display == "none4") {

        $('.sf-form-container4').hide(500);

        return;

    }
    $('.sf-form-container').slideToggle();
    $('.sf-form-container1').slideToggle();
    $('.sf-form-container2').slideToggle();
    $('.sf-form-container3').slideToggle();
    $('.sf-form-container4').slideToggle();

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
async function UpdatingHealtyInfo(HealtyInfo){
  $.post(AdressFrontServer+'/Healty/UpdatingHealtyInfo/'+'HealtyInfo',HealtyInfo, function (data) {
    }).done(function (data) {
     if(data.bandera==false){
     NotificationError("Error: intente nuevamente.");
      }else{
     NotificationSuccess("Datos de seguro médico actualizados.");
      slideFormContainer('none1');
      }
      
    }).fail(function () {
         NotificationError("Error al guardar empleado  " + HealtyData.Nombre_Usuario);

    return false;
    }).always(function () {
        
    }); 
}
//===============================SchetchDuler=================================
async function InsertingClinicalInfo(ClinicalInfo){
  $.post(AdressFrontServer+'/Healty/NewClinicalInformation/'+'ClinicalInfo',ClinicalInfo, function (data) {
    }).done(function (data) {
    
     NotificationSuccess("Registro de información clinica exitosa.");
     
      
    }).fail(function () {
         NotificationError("Error al guardar datos clinicos");

    return false;
    }).always(function () {
        
    }); 
}
async function UpdateClinicalInfo(ClinicalInfo){
  $.post(AdressFrontServer+'/Healty/UpdateClinicalInformation/'+'ClinicalInfo',ClinicalInfo, function (data) {
    }).done(function (data) {
    
     NotificationSuccess("Registro de información clinica actualizada.");
     
      
    }).fail(function () {
         NotificationError("Error al guardar datos clinicos");

    return false;
    }).always(function () {
        
    }); 
}
//=====================Recipe=================================================
async function InsertingRecipes(MedicalRecipe){
  $.post(AdressFrontServer+'/Healty/NewMedicalRecipe/'+'MedicalRecipe',MedicalRecipe, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Registro de receta exitosa.");
    // slideFormContainer('none3');
    }
    else
       NotificationError("Ocurrió un error: uno o varios medicamentos ya se han recetado en esta contulta.");
      
    }).fail(function () {
         NotificationError("Error al guardar receta");

    return false;
    }).always(function () {
        
    }); 
}

async function UpdatingRecipes(MedicalRecipe){
   $.post(AdressFrontServer+'/Healty/UpdatingRecipe/'+'MedicalRecipe',MedicalRecipe, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Actualización de receta exitosa.");
     slideFormContainer('none3');
    }
    else
       NotificationError("Ocurrió un error: uno o varios medicamentos ya se han recetado en esta contulta.");
      
    }).fail(function () {
         NotificationError("Error al guardar receta");

    return false;
    }).always(function () {
        
    }); 
}

async function DeleteMedicine(idRecetado){
   $.post(AdressFrontServer+'/Healty/DeleteMedicine/'+idRecetado, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Medicamento eliminado de la receta.");
    }
    
      
    }).fail(function () {
         NotificationError("Error al guardar receta");

    return false;
    }).always(function () {
        
    }); 
}
//============================================================================
//==================================SintomaData===============================
async function NewSintomaData(SintomaData){
  $.post(AdressFrontServer+'/Healty/CreatingNewSintomaData/'+'SintomaData',SintomaData, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de consulta registrados correctamente.");
     slideFormContainer('none2');
    }
    
      
    }).fail(function () {
         NotificationError("Error al guardar datos de consulta.");

    return false;
    }).always(function () {
        
    }); 
}

async function UpdateSintomaData(SintomaData){
  $.post(AdressFrontServer+'/Healty/UpdatingSintomaData/'+'SintomaData',SintomaData, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de consulta actualizados correctamente.");
     slideFormContainer('none2');
    }
    
      
    }).fail(function () {
         NotificationError("Error al guardar datos de consulta.");

    return false;
    }).always(function () {
        
    }); 
}
//============================================================================
//==================================Hemodialisis==============================
async function NewHemoData(HemoData){
  $.post(AdressFrontServer+'/Healty/NewHemodialisisData/HemoData',HemoData, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de hemodiálisis insertados.");
     slideFormContainer('none4');
    }
    else{
       NotificationError("Error al guardar datos de Hemodialisis, hay un problema con la fecha ingresada.");
    }
      
    }).fail(function () {
         NotificationError("Error al guardar datos de Hemodialisis.");

    return false;
    }).always(function () {
        
    }); 
    }
  async function UpdateHemoData(HemoData){
  $.post(AdressFrontServer+'/Healty/UpdatingHemodialisisData/HemoData',HemoData, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de hemodiálisis actualizados.");
     slideFormContainer('none4');
    }
    else{
       NotificationError("Error al guardar datos de Hemodialisis, la fecha se empalma.");
    }
      
    }).fail(function () {
         NotificationError("Error al guardar datos de Hemodialisis.");

    return false;
    }).always(function () {
        
    }); 
    }
//============================================================================
//==================================Medicine==================================
async function InsertingMedicines(MedicineInfo){
   $.post(AdressFrontServer+'/Healty/NewMedicineRegistry/'+'MedicineInfo',MedicineInfo, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de medicamento guardados correctamente.");
     slideFormContainer('none');
    }
    
      
    }).fail(function () {
         NotificationError("Error al guardar datos de medicamento.");

    return false;
    }).always(function () {
        
    }); 
}
async function UpdatingMedicines(MedicineInfo){
   $.post(AdressFrontServer+'/Healty/UpdatingMedicines/MedicineInfo',MedicineInfo, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de medicamento actualizados correctamente.");
     slideFormContainer('none');
    }
    
      
    }).fail(function () {
         NotificationError("Error al guardar datos de medicamento.");

    return false;
    }).always(function () {
        
    }); 
}
async function DeletingMedicine(ID_Medicamento){
  $.post(AdressFrontServer+'/Healty/DeletingMedicine/'+ID_Medicamento, function (data) {
    }).done(function (data) {
    if(data.bandera){
     NotificationSuccess("Datos de medicamento eliminados correctamente.");
     slideFormContainer('none');
    }
    
      
    }).fail(function () {
         NotificationError("Error al guardar datos de medicamento.");

    return false;
    }).always(function () {
        
    }); 
}
async function FinishingSchecht(ID_Consultas){
       var dataToForm = $.ajax({

              type: 'GET',

               url: "http://localhost:3000/Healty/FinishSchetch/"+ID_Consultas,

              async: false,

            dataType: "json",

           

           success: function (data) {

              return data;

           },

            error: function (xhr, type, exception) {

                // Do your thing

            }
    
        });
        NotificationSuccess("Se terminó la consulta.");
       
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
async function UpdateMedicalAppointment(SchechInfo){
    $.post(AdressFrontServer+'/Nurse/UpdatingSchechInformation/'+'SchechInfo',SchechInfo, function (data) {
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
 //================================HemodialisisSession========================
    async function HemodialisisSession(PreData){
    $.post(AdressFrontServer+'/Nurse/NewPreData/PreData',PreData, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Registro de datos pre-hemodiálisis correcto.");
      slideFormContainer('none');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}
   async function UpdateHemodialisisSession(PreData){
    $.post(AdressFrontServer+'/Nurse/UpdatePreData/PreData',PreData, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Actualización de datos pre-hemodiálisis correcto.");
      slideFormContainer('none');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}
async function NewAntroData(AntroData){
   $.post(AdressFrontServer+'/Nurse/NewAntroData/AntroData',AntroData, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Se insertaron datos antropométricos correctamente.");
      slideFormContainer('none1');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
 
}
async function UpdateAntroData(AntroData){
   $.post(AdressFrontServer+'/Nurse/UpdateAntroData/AntroData',AntroData, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Se actualizaron datos antropométricos correctamente.");
      slideFormContainer('none1');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
 
}
async function CreateMedicineData(MedicineData){
   $.post(AdressFrontServer+'/Nurse/NewMedicineDuringHemo/MedicineData',MedicineData, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Se agregaron datos de medicamentos a la sesión.");
      slideFormContainer('none2');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
 
}
async function UpdateMedicineData(MedicineData){
   $.post(AdressFrontServer+'/Nurse/UpdateMedicineDuringHemo/MedicineData',MedicineData, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Se modificaron los datos de medicamentos en la sesión.");
      slideFormContainer('none2');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
 
}
async function DeleteMedicineData(ID_MedicinaHemodialisis){
   $.post(AdressFrontServer+'/Nurse/DeletingMedicine/'+ID_MedicinaHemodialisis, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Se eliminaron los datos de medicamentos en la sesión.");
      slideFormContainer('none2');
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
 
}
async function StartHemoSession(ID_Hemodialisis){
  $.post(AdressFrontServer+'/Nurse/SessionStart/'+ID_Hemodialisis, function (data) {
    }).done(function (data) {
     if(data.bandera){
      NotificationSuccess("Se inicia el proceso de hemodiálisis.");
      
     
      }
      
    }).fail(function () {
         NotificationError("Error al guardar registro");

    return false;
    }).always(function () {
        
    }); 
}
//============================================================================

