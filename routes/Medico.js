var express = require('express');
var router = express.Router();
var underscore=require('underscore');

//New Patient
router.get('/', function(req, res, next) {
  res.render('Medico/indexMedi', { title: 'Bienvenido', otroTexto: 'Medico' });
});
router.get('/NewPatient', function(req, res, next) {
  res.render('Medico/NewPatient/NewPatient', { title: 'Bienvenido', otroTexto: 'Medico' });
});
router.post('/NewPatientRegistry/PatientInfo', function(req, res, next) {
var query="SELECT * FROM Usuario";
global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    if(FindingDuplicateDataInserting(req.body,result)){
    var userToRegister={Nombre_Usuario:req.body.Nombre_Usuario.toUpperCase(),Apellido_Paterno_usuario:req.body.Apellido_Paterno_usuario.toUpperCase(),Apellido_Materno_usuario:req.body.Apellido_Materno_usuario.toUpperCase(),Sexo_usuario:req.body.Sexo_usuario,Estado_Civil_usuario:req.body.Estado_Civil_usuario,Numero_Telefonico_usuario:req.body.Numero_Telefonico_usuario,Numero_Celular_usuario:req.body.Numero_Celular_usuario,Fecha_Nacimiento_usuario:req.body.Fecha_Nacimiento_usuario,Correo_usuario:req.body.Correo_usuario,Contrasena:req.body.Contrasena};
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


//Support functions for patients data
async function insertingPatient(PatientInformation){
  global.conexion.insert('Paciente', PatientInformation, function(err, response) {
    if (err) throw err;
    console.log("Correcto, paciente insertado");  
  });
}
async function insertingAddressInfo(PatientsAddress){
   global.conexion.insert('Domicilio', PatientsAddress, function(err, response) {
    if (err) throw err;
    console.log("Correcto, domicilio insertado");  
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
module.exports = router;