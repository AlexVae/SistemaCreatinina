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
var sexo=[{Sexo_usuario: "Masculino"},{Sexo_usuario:"Femenino"}];
var civilData=[{Estado_Civil_usuario:"Soltero"},{Estado_Civil_usuario:"Divorciado"},{Estado_Civil_usuario:"Casado"}, {Estado_Civil_usuario:"Viudo"}];
var PersonalData=[{ID_Tipo:1, Descripcion:"Médico"},{ID_Tipo:2, Descripcion:"Enfermero"}];
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

    if (display == "none") {

        //$('.sf-form-container').css('display', display);

        $('.sf-form-container').hide(500);

        return;

    }

    if (display == "none1") {

        $('.popup').hide(500);

        return;

    }

    $('.sf-form-container').slideToggle();

}
function RefreshDatagrid() {

    var dataGrid = $('#gridContainer').dxDataGrid('instance');

    dataGrid.refresh();

    dataGrid.repaint();

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
//============================== ADMIN=======================================

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



