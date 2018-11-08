var express = require('express');
var router = express.Router();
var underscore=require('underscore');
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//==================================ADMIN=====================================

//index
router.get('/startAdmin', function(req, res, next) {
 res.render('Admin/indexAdmin', { title: 'Bienvenido', otroTexto: 'Administrador' });
});
//New Healty Personal
router.get('/NewHealty', function(req, res, next) {
 res.render('Admin/NewHealty', { title: 'Nuevo personal de salud', otroTexto: 'Administrador' });
});
//Register a New Healty Personal 
router.post('/NewHealtyRegistry/HealtyData', function(req, res, next) {
   //console.log(req.body);
   var cedulaProf=req.body.ID_Cedula_Profesional;
   var licencia=req.body.Numero_Licencia;
   var correo=req.body.Correo_usuario;
   var DataToVerify={ID_Cedula_Profesional:cedulaProf,Numero_Licencia:licencia,Correo_usuario:correo};
   var query="SELECT * FROM Usuario AS a INNER JOIN PersonalSalud AS b ON a.IdUsuario=b.ID_Personal_Salud INNER JOIN Especialidad AS c ON b.ID_Cedula_Profesional= c.ID_Cedula_Profesional INNER JOIN Tipo AS d ON b.ID_Tipo=d.ID_Tipo";
  global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    if(FindingDuplicateDataInserting(DataToVerify,result)){
     var userToRegister={Nombre_Usuario:req.body.Nombre_Usuario,Apellido_Paterno_usuario:req.body.Apellido_Paterno_usuario,Apellido_Materno_usuario:req.body.Apellido_Materno_usuario,Sexo_usuario:req.body.Sexo_usuario,Estado_Civil_usuario:req.body.Estado_Civil_usuario,Numero_Telefonico_usuario:req.body.Numero_Telefonico_usuario,Numero_Celular_usuario:req.body.Numero_Celular_usuario,Fecha_Nacimiento_usuario:req.body.Fecha_Nacimiento_usuario,Correo_usuario:req.body.Correo_usuario,Contrasena:req.body.Contrasena};
   global.conexion.insert('Usuario', userToRegister, function(err, response) {
    if (err) throw err;
    //console.log(response);
    var query='SELECT MAX(IdUsuario) AS MAX FROM Usuario'
    global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    //console.log(result[0].MAX);
    var HealtyPersonalInformation={ID_Personal_Salud:result[0].MAX,ID_Cedula_Profesional:cedulaProf,ID_Tipo:req.body.ID_Tipo};
    console.log(cedulaProf+" 2  "+licencia);
    var medicalSpeciality={Numero_Licencia:licencia,Nombre_Especialidad:req.body.Nombre_Especialidad,Descripcion_Especialidad:req.body.Descripcion_Especialidad,ID_Cedula_Profesional:cedulaProf};
    insertingSpeciality(medicalSpeciality);
    insertingHealtyPersonal(HealtyPersonalInformation);
    res.json(req.body.Correo_usuario);
  });
  });
    }else{

      res.json({bandera:false});
    }
  //console.log(query);
    });

   
   

});

//VERIFYING AT INSERT DATA
function FindingDuplicateDataInserting(DataFromForm,AllData){
var banderaCedula=true,banderaLicencia=true,banderaCorreo=true; 
  //Verificamos Cédula 
  var DataOne = underscore.findWhere(AllData,{ID_Cedula_Profesional:DataFromForm.ID_Cedula_Profesional});
  if(DataOne!=undefined){
      banderaCedula=false;
  }
  //Verificamos Licencia
  var DataTwo = underscore.findWhere(AllData,{Numero_Licencia:DataFromForm.Numero_Licencia});
  if(DataTwo!=undefined){
      banderaLicencia=false;
    
  }
  //VerificamosCorreo
   var DataThree = underscore.findWhere(AllData,{Correo_usuario:DataFromForm.Correo_usuario});
  if(DataThree!=undefined){
      banderaCorreo=false;
  }
  //Nos vamos al final
  if(banderaCorreo&&banderaLicencia&&banderaCedula){
    return true;
  }else{
    return false;
  }
}

  //
//

//inserting a medical speciality
async function insertingSpeciality(data){
console.log("especialidad")
console.log(data);
global.conexion.insert('Especialidad', data, function(err, response) {
    if (err) throw err;
    console.log("Correcto especialidad insertada");
  });
}

//inserting data from healty personal
async function insertingHealtyPersonal(data){
  console.log("healthy")
   console.log(data);
global.conexion.insert('PersonalSalud', data, function(err, response) {
    if (err) throw err;
    console.log("Información de personal de salud insertada de manera correcta" );
  });
}
//GETTING ALL DATA FROM MEDICAL PERSONAL
router.get('/GetHealtyInformation', function(req, res, next) {
  var query="SELECT * FROM Usuario AS a INNER JOIN PersonalSalud AS b ON a.IdUsuario=b.ID_Personal_Salud INNER JOIN Especialidad AS c ON b.ID_Cedula_Profesional= c.ID_Cedula_Profesional INNER JOIN Tipo AS d ON b.ID_Tipo=d.ID_Tipo";
  global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
});

 }); 
//UPDATING ALL POSIBLE DATA
router.post('/UpdateHealtyPersonalInformation/HealtyData', function(req, res, next) {
   //console.log(req.body);
   var CompleteData=req.body;
   //var userToRegister={Nombre_Usuario:req.body.Nombre_Usuario,Apellido_Paterno_usuario:req.body.Apellido_Paterno_usuario,Apellido_Materno_usuario:req.body.Apellido_Materno_usuario,Sexo_usuario:req.body.Sexo_usuario,Estado_Civil_usuario:req.body.Estado_Civil_usuario,Numero_Telefonico_usuario:req.body.Numero_Telefonico_usuario,Numero_Celular_usuario:req.body.Numero_Celular_usuario,Fecha_Nacimiento_usuario:req.body.Fecha_Nacimiento_usuario,Correo_usuario:req.body.Correo_usuario,Contrasena:req.body.Contrasena};
   var query="SELECT * FROM Usuario AS a INNER JOIN PersonalSalud AS b ON a.IdUsuario=b.ID_Personal_Salud INNER JOIN Especialidad AS c ON b.ID_Cedula_Profesional= c.ID_Cedula_Profesional INNER JOIN Tipo AS d ON b.ID_Tipo=d.ID_Tipo";
  global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    if(FindingDuplicateData(CompleteData,result)){
        //
    var userToUpdate={Nombre_Usuario:CompleteData.Nombre_Usuario,Apellido_Paterno_usuario:CompleteData.Apellido_Paterno_usuario,Apellido_Materno_usuario:CompleteData.Apellido_Materno_usuario,Sexo_usuario:CompleteData.Sexo_usuario,Estado_Civil_usuario:CompleteData.Estado_Civil_usuario,Numero_Telefonico_usuario:CompleteData.Numero_Telefonico_usuario,Numero_Celular_usuario:CompleteData.Numero_Celular_usuario,Fecha_Nacimiento_usuario:CompleteData.Fecha_Nacimiento_usuario,Correo_usuario:CompleteData.Correo_usuario,Contrasena:CompleteData.Contrasena};
   global.conexion.update('Usuario', userToUpdate,{IdUsuario:{operator:'=', value:CompleteData.IdUsuario}}, function(err, response) {
    if (err) throw err;
      UpdateMedicalSpeciality(CompleteData);
      UpdateHealtyPersonalInformation(CompleteData);
      res.json({bandera:true});

     });


    //
    }else{
     res.json({bandera:false});
    }

});

});
//Updating medical specialitys
async function UpdateMedicalSpeciality(DataFromForm){
    var medicalSpeciality={Numero_Licencia:DataFromForm.Numero_Licencia,Nombre_Especialidad:DataFromForm.Nombre_Especialidad,Descripcion_Especialidad:DataFromForm.Descripcion_Especialidad,ID_Cedula_Profesional:DataFromForm.ID_Cedula_Profesional};
    global.conexion.update('Especialidad', medicalSpeciality,{ID_Cedula_Profesional:{operator:'=', value:DataFromForm.CacheCedula}}, function(err, response) {
    if (err) throw err;
    console.log("Correcto especialidad actualizada");
    });
}
//Updating Healty personal information
async function UpdateHealtyPersonalInformation(DataFromForm){
    var HealtyPersonalInformation={ID_Personal_Salud:DataFromForm.IdUsuario,ID_Cedula_Profesional:DataFromForm.ID_Cedula_Profesional,ID_Tipo:DataFromForm.ID_Tipo};
    global.conexion.update('PersonalSalud', HealtyPersonalInformation,{ID_Personal_Salud:{operator:'=', value:DataFromForm.IdUsuario}}, function(err, response) {
    if (err) throw err;
    console.log("Correcto, personal salud actualizado");
    });
}

function FindingDuplicateData(DataFromForm,AllData){
var banderaCedula=true,banderaLicencia=true,banderaCorreo=true; 
  //Verificamos Cédula 
  var DataOne = underscore.findWhere(AllData,{ID_Cedula_Profesional:DataFromForm.ID_Cedula_Profesional});
  if(DataOne!=undefined){
    if(DataOne.IdUsuario!=DataFromForm.IdUsuario){
      banderaCedula=false;
    }
  }
  //Verificamos Licencia
  var DataTwo = underscore.findWhere(AllData,{Numero_Licencia:DataFromForm.Numero_Licencia});
  if(DataTwo!=undefined){
    if(DataTwo.IdUsuario!=DataFromForm.IdUsuario){
      banderaLicencia=false;
    }
  }
  //VerificamosCorreo
   var DataThree = underscore.findWhere(AllData,{Correo_usuario:DataFromForm.Correo_usuario});
  if(DataThree!=undefined){
    if(DataThree.IdUsuario!=DataFromForm.IdUsuario){
      banderaCorreo=false;
    }
  }
  //Nos vamos al final
  if(banderaCorreo&&banderaLicencia&&banderaCedula){
    return true;
  }else{
    return false;
  }
  //
}
//DELETING DATA
router.post('/DeleteHealtyPersonalInformation/HealtyData', function(req, res, next) {
  

});
//junk
function GettingAllDataUsersWithId(){
var dataToReturn;
var query='SELECT MAX(IdUsuario) AS MAX FROM Usuario'
  console.log(query);
  mysqlJson.query(query, function (err, result, fields) {
    if (err) throw err;
    dataToReturn=result[0].MAX;
  });
  return dataToReturn;
}
//===========================================================================

//==================================LOGIN==========================================

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Inicio de sesión', otroTexto: 'Otro texto' });
});

router.post('/loginStart/loginData', function(req, res, next) {
	 var username=req.body.Nombre_Usuario;
	 var pass = req.body.Contrasena;
   console.log(req.body);
   var query='SELECT * FROM Usuario WHERE Nombre_Usuario='+"'"+username+"'"+" AND Contrasena="+"'"+pass+"'";
   console.log(query);
  global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
   var LoginData=underscore.findWhere(result,{Nombre_Usuario:username,Contrasena:pass});
   console.log(LoginData);
   //res.json(result[0]);
  });
   // res.json({hola:"Polo"});

});
//===========================================================================
router.get('/saluda/:nombre/:nene', function(req, res) {
    res.send('Hola ' + req.params.nombre+" "+req.params.nene);
    
});



module.exports = router;
