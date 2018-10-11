var express = require('express');
var router = express.Router();
var underscore=require('underscore');

//===================================================================New Patient
router.get('/', function(req, res, next) {
  res.render('Medico/indexMedi', { title: 'Bienvenido', otroTexto: 'Medico' });
});
router.get('/NewPatient', function(req, res, next) {
  res.render('Medico/NewPatient/NewPatient', { title: 'Bienvenido', otroTexto: 'Medico' });
});
//=======================NEW REGISTRY========================================
router.post('/NewPatientRegistry/PatientInfo', function(req, res, next) {
 var query="SELECT * FROM Usuario";
 global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    if(FindingDuplicateDataInserting(req.body,result)){
    var userToRegister={Nombre_Usuario:req.body.Nombre_Usuario.toUpperCase(),Apellido_Paterno_usuario:req.body.Apellido_Paterno_usuario.toUpperCase(),Apellido_Materno_usuario:req.body.Apellido_Materno_usuario.toUpperCase(),Sexo_usuario:req.body.Sexo_usuario,Estado_Civil_usuario:req.body.Estado_Civil_usuario,Numero_Telefonico_usuario:req.body.Numero_Telefonico_usuario,Numero_Celular_usuario:req.body.Numero_Celular_usuario,Fecha_Nacimiento_usuario:req.body.Fecha_Nacimiento_usuario,Correo_usuario:req.body.Correo_usuario.toLowerCase(),Contrasena:req.body.Contrasena};
    global.conexion.insert('Usuario', userToRegister, function(err, response) {
    if (err) throw err;
    //console.log(response);
    var query='SELECT IdUsuario AS MAX FROM Usuario WHERE Correo_usuario='+"'"+req.body.Correo_usuario+"'";
    global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    //console.log(result[0].MAX);
    var PatientInformation={ID_Paciente:result[0].MAX,Estatura:req.body.Estatura,Grupo_Sanguineo:req.body.Grupo_Sanguineo,Etnia:req.body.Etnia,Acceso_Vascular:req.body.Acceso_Vascular,ID_Usuario:result[0].MAX};
    var PatientsAddress={IdUsuario:result[0].MAX,Calle:req.body.Calle.toUpperCase(),Num_Interior:req.body.Num_Interior,Num_Exterior:req.body.Num_Exterior,Colonia:req.body.Colonia.toUpperCase(),Codigo_Postal:req.body.Codigo_Postal,Municipio:req.body.Municipio.toUpperCase(),Localidad:req.body.Localidad.toUpperCase(),Estado:req.body.Estado};
    insertingPatient(PatientInformation);
    insertingAddressInfo(PatientsAddress);
    res.json(req.body.Correo_usuario);
  });
  });
    }else{
     res.json({bandera:false});
    }
  //console.log(query);
    });

});
//Creating emergency contacts for patients
router.post('/NewEmergencyContact/EmergencyInfo', function(req,res,next){
  var query="SELECT * FROM ContactoEmergencia WHERE ID_Paciente="+"'"+req.body.ID_Paciente+"'";
  global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    console.log(result);
    if(FindingDuplicateEmergencyContacts(req.body,result)){
      var emergencyToInsert={ID_Paciente:req.body.ID_Paciente,Nombre:req.body.Nombre.toUpperCase(),Apellido_Paterno:req.body.Apellido_Paterno.toUpperCase(),Apellido_Materno:req.body.Apellido_Materno.toUpperCase(),Numero_Telefonico:req.body.Numero_Telefonico,Numero_Celular:req.body.Numero_Celular,Parentesco_Paciente:req.body.Parentesco_Paciente.toUpperCase()};
       global.conexion.insert('ContactoEmergencia',emergencyToInsert, function(err, response) {
       if (err) throw err;
       res.json({bandera:true});
     });
    }else{
      res.json({bandera:false});
    }
  });
});
//Creating healty emergency info for patients
router.post('/NewHealtyInformation/HealtyInfo', function(req,res,next){
  var query="SELECT * FROM SeguroMedico";
  global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    console.log(result);
    if(FindingDuplicateHealtyInfo(req.body,result)){
      var HealtyToInsert={ID_Numero_Poliza:req.body.ID_Numero_Poliza,ID_Paciente:req.body.ID_Paciente,Nombre_Seguradora:req.body.Nombre_Seguradora.toUpperCase(),Cobertura_Seguradora:req.body.Cobertura_Seguradora.toUpperCase()};
      global.conexion.insert('SeguroMedico',HealtyToInsert, function(err, response) {
       if (err) throw err;
       res.json({bandera:true});
     });
    }else{
      res.json({bandera:false});
    }
  });
});
//===========================================================================

//==========================UPDATING DATA====================================
//UPDATING PATIENTS
router.post('/UpdatingPatientsInformation/PatientsInfo', function(req,res,next){
 var query="SELECT * FROM Usuario AS U INNER JOIN PacientE AS P ON U.IdUsuario=P.ID_Paciente AND U.Eliminado=1 INNER JOIN Domicilio as D ON D.IdUsuario=P.ID_Paciente";
 global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    if(FindingDuplicateDataUpdating(req.body,result)){
      var userToUpdate={Nombre_Usuario:req.body.Nombre_Usuario.toUpperCase(),Apellido_Paterno_usuario:req.body.Apellido_Paterno_usuario.toUpperCase(),Apellido_Materno_usuario:req.body.Apellido_Materno_usuario.toUpperCase(),Sexo_usuario:req.body.Sexo_usuario,Estado_Civil_usuario:req.body.Estado_Civil_usuario,Numero_Telefonico_usuario:req.body.Numero_Telefonico_usuario,Numero_Celular_usuario:req.body.Numero_Celular_usuario,Fecha_Nacimiento_usuario:req.body.Fecha_Nacimiento_usuario,Correo_usuario:req.body.Correo_usuario.toLowerCase(),Contrasena:req.body.Contrasena}; 
       global.conexion.update('Usuario', userToUpdate,{IdUsuario:{operator:'=', value:req.body.IdUsuario}}, function(err, response) {
    if (err) throw err;
      var PatientInformation={ID_Paciente:req.body.ID_Paciente,Estatura:req.body.Estatura,Grupo_Sanguineo:req.body.Grupo_Sanguineo,Etnia:req.body.Etnia,Acceso_Vascular:req.body.Acceso_Vascular,ID_Usuario:req.body.ID_Paciente};
      var PatientsAddress={IdUsuario:req.body.IdUsuario,Calle:req.body.Calle.toUpperCase(),Num_Interior:req.body.Num_Interior,Num_Exterior:req.body.Num_Exterior,Colonia:req.body.Colonia.toUpperCase(),Codigo_Postal:req.body.Codigo_Postal,Municipio:req.body.Municipio.toUpperCase(),Localidad:req.body.Localidad.toUpperCase(),Estado:req.body.Estado};
      updatingPatient(PatientInformation);
      updatingAddressInfo(PatientsAddress);
      res.json(req.body.Correo_usuario);

     });
    }else{
      res.json({bandera:false});         
    }
 });
});
router.post('/UpdatingEmergencyContact/EmergencyInfo', function(req,res,next){
 var query="SELECT * FROM ContactoEmergencia WHERE ID_Paciente="+"'"+req.body.ID_Paciente+"'";
  global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    if(FindingDuplicateDataUpdating){
      var emergencyToInsert={ID_Paciente:req.body.ID_Paciente,Nombre:req.body.Nombre.toUpperCase(),Apellido_Paterno:req.body.Apellido_Paterno.toUpperCase(),Apellido_Materno:req.body.Apellido_Materno.toUpperCase(),Numero_Telefonico:req.body.Numero_Telefonico,Numero_Celular:req.body.Numero_Celular,Parentesco_Paciente:req.body.Parentesco_Paciente.toUpperCase()};
       global.conexion.update('ContactoEmergencia',emergencyToInsert,{ID_Contacto_Emergencia:{operator:'=', value:req.body.ID_Contacto_Emergencia}}, function(err, response) {
       if (err) throw err;
       res.json({bandera:true});
     });
    }else{
      res.json({bandera:false});
    }
    
  });
});
//===========================================================================
//===============================================GETTIN ALL DATA FROM PATIENTS
router.get('/GetAllPatientsInformation',function(req,res,next){
 var query="SELECT * FROM Usuario AS U INNER JOIN PacientE AS P ON U.IdUsuario=P.ID_Paciente AND U.Eliminado=1 INNER JOIN Domicilio as D ON D.IdUsuario=P.ID_Paciente";
 global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
 });

});
router.post('/GetAllEmergencyInformation/ToFind',function(req,res,next){
  var query="SELECT * FROM ContactoEmergencia WHERE Eliminado=1 AND ID_Paciente="+"'"+req.body.ID_Paciente+"'";
  global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    res.json(result);
  });
});

router.get('/GettingEmergency/:IdUsuario/', function(req, res) {
   // res.send('Hola ' + req.params.nombre+" "+req.params.nene);
   var query="SELECT * FROM ContactoEmergencia WHERE Eliminado=1 AND ID_Paciente="+"'"+req.params.IdUsuario+"'";
    global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    res.json(result);
          });
});

router.get('/GettingSafety/:IdUsuario/', function(req, res) {
   // res.send('Hola ' + req.params.nombre+" "+req.params.nene);
   var query="SELECT * FROM SeguroMedico WHERE Eliminado=1 AND ID_Paciente="+"'"+req.params.IdUsuario+"'";
    global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    res.json(result);
          });
});
//============================================================================
//=========================================Support functions for patients data
async function insertingPatient(PatientInformation){
  global.conexion.insert('Paciente', PatientInformation, function(err, response) {
    if (err) throw err;
    console.log("Correcto, paciente insertado");  
  });
}
async function updatingPatient(PatientInformation){
  
   global.conexion.update('Paciente', PatientInformation,{ID_Paciente:{operator:'=', value:PatientInformation.ID_Paciente}}, function(err, response) {
    if (err) throw err;
    console.log("Correcto, paciente actualizado");  
  });
}
async function insertingAddressInfo(PatientsAddress){
   global.conexion.insert('Domicilio', PatientsAddress, function(err, response) {
    if (err) throw err;
    console.log("Correcto, domicilio insertado");  
  });
}
async function updatingAddressInfo(PatientsAddress){
  
 global.conexion.update('Domicilio', PatientsAddress,{IdUsuario:{operator:'=', value:PatientsAddress.IdUsuario}}, function(err, response) {
    if (err) throw err;
    console.log("Correcto, paciente actualizado");  
  });
}
function FindingDuplicateDataInserting(DataFromForm,AllData){
 var banderaCorreo=true; 
  //Verificamos Cédula 
   var DataThree = underscore.findWhere(AllData,{Correo_usuario:DataFromForm.Correo_usuario});
  if(DataThree!=undefined){
      banderaCorreo=false;
  }
  //Nos vamos al final
  if(banderaCorreo){
    return true;
  }else{
    return false;
  }
}
function FindingDuplicateDataUpdating(DataFromForm,AllData){
  var banderaCorreo=true;
  var DataThree = underscore.findWhere(AllData,{Correo_usuario:DataFromForm.Correo_usuario});
  if(DataThree!=undefined){
       if(DataThree.IdUsuario!=DataFromForm.IdUsuario){
        banderaCorreo=false;
       }
  }
  if(banderaCorreo){
    return true;
  }else{
    return false;
  }
}
//Checking if theres already an emergency contact registered
function FindingDuplicateEmergencyContacts(DataFromForm,AllData){
  var bandera1=true,bandera2=true;
  var DataOne=underscore.findWhere(AllData,{Numero_Telefonico:DataFromForm.Numero_Telefonico});
  if(DataOne!=undefined){
    bandera1=false;
  }
  var DataTwo=underscore.findWhere(AllData,{Numero_Celular:DataFromForm.Numero_Celular});
  if(DataTwo!=undefined){
    bandera2=false;
  }
  if(bandera1&&bandera2){
    return true;
  }else{
    return false
  }
}
function FindingDuplicateEmergencyContactsUpdating(DataFromForm,AllData){
  var bandera1=true,bandera2=true;
  var DataOne=underscore.findWhere(AllData,{Numero_Telefonico:DataFromForm.Numero_Telefonico});
  if(DataOne!=undefined){
    if(DataOne.ID_Contacto_Emergencia!=DataFromForm.ID_Contacto_Emergencia){
        bandera1=false;
       }
  }
  var DataTwo=underscore.findWhere(AllData,{Numero_Celular:DataFromForm.Numero_Celular});
  if(DataTwo!=undefined){
    if(DataOne.ID_Contacto_Emergencia!=DataFromForm.ID_Contacto_Emergencia){
        bandera2=false;
       }
  }
  if(bandera1&&bandera2){
    return true;
  }else{
    return false
  }
}
//Checking if there's already some healty information registered
function FindingDuplicateHealtyInfo(DataFromForm,AllData){
 var bandera=true;
 var DataOne=underscore.findWhere(AllData,{ID_Numero_Poliza:DataFromForm.ID_Numero_Poliza});
 
  if(DataOne!=undefined){
    bandera=false;
  }
  if(bandera){
    return true;
  }else{
    return false;
  }
}











module.exports = router;