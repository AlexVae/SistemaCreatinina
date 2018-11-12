var express = require('express');
var router = express.Router();
var underscore=require('underscore');
var moment= require('moment');
var moment1 = require('moment-precise-range-plugin');
var moment2=require('moment-range');
//=========================Views=============================================
router.get('/', function(req, res, next) {
  res.render('Medico/indexMedi', { title: 'Bienvenido', otroTexto: 'Medico' });
});
router.get('/NewPatient', function(req, res, next) {
  res.render('Medico/NewPatient/NewPatient', { title: 'Bienvenido', otroTexto: 'Medico' });
});
router.get('/MySchecht', function(req, res, next) {
  res.render('Medico/Consultas/Consultas', { title: 'Mis Consultas', otroTexto: 'Medico' });
});
router.get('/Consulting', function(req, res, next) {
  res.render('Medico/Consultando/Consultando', { title: 'Consultas de hoy', otroTexto: 'Medico' });
});
router.get('/NewMedicineRegistry', function(req, res, next) {
  res.render('Medico/Medicine/Medicine', { title: 'Registro de un nuevo medicamento', otroTexto: 'Medico' });
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
 var query="SELECT * FROM Usuario AS U INNER JOIN Paciente AS P ON U.IdUsuario=P.ID_Paciente AND U.Eliminado=1 INNER JOIN Domicilio as D ON D.IdUsuario=P.ID_Paciente";
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
    if(FindingDuplicateEmergencyContactsUpdating(req.body,result)){
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

router.get('/GettingInfo/:IdUsuario/', function(req, res) {
   // res.send('Hola ' + req.params.nombre+" "+req.params.nene);
   var Today=moment().format('MM-DD-YYYY');
   var query="SELECT * FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas =CC.ID_Cita INNER JOIN Paciente AS P ON C.ID_Paciente=P.ID_Paciente LEFT JOIN Usuario AS U ON C.ID_Paciente=U.IdUsuario  AND CC.Terminado=1 WHERE U.IdUsuario="+"'"+req.params.IdUsuario+"'"+" AND CC.Fecha="+"'"+Today+"'";
    global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    res.json(result);
          });
});


//============================================================================
//=============================SCHETCHDULER===================================
router.get('/GetAllAppointInfo',function(req,res,next){
 var query="SELECT CC.text, CC.startDate, CC.endDate FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas =CC.ID_Cita WHERE C.ID_Personal_Salud=33 AND CC.Terminado=1";
 global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
 });

});
router.get('/GetTodayAppointInfo',function(req,res,next){
  var Today=moment().format('MM-DD-YYYY');
 var query="SELECT * FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas =CC.ID_Cita INNER JOIN Paciente AS P ON C.ID_Paciente=P.ID_Paciente LEFT JOIN Usuario AS U ON C.ID_Paciente=U.IdUsuario WHERE C.ID_Personal_Salud=33 AND CC.Terminado=1 AND CC.Fecha="+"'"+Today+"'";
 global.conexion.query(query, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
 });

});
router.post('/NewClinicalInformation/ClinicalInfo', function(req,res,next){
  var ClinicalData={AcidoUrico:req.body.AcidoUrico,Urea:req.body.Urea,Trigliceridos:req.body.Trigliceridos,Sodio:req.body.Sodio,RelacionAG:req.body.RelacionAG,ProteinaTotal:req.body.ProteinaTotal,ProteinaC:req.body.ProteinaC,Potasio:req.body.Potasio,BUN:req.body.BUN,LDH:req.body.LDH,Hierro:req.body.Hierro,MagnesioEnSangre:req.body.MagnesioEnSangre,Glucosa:req.body.Glucosa,Globulinas:req.body.Globulinas,Fosforo:req.body.Fosforo,Creatinina:req.body.Creatinina,Colesterol:req.body.Colesterol,Cloro:req.body.Cloro,CaptacionHierro:req.body.CaptacionHierro,Calcio:req.body.Calcio,Albumina:req.body.Albumina,ID_Consultas:req.body.ID_Consultas};
  console.log(ClinicalData);
  global.conexion.insert('AnalisisClinicosC', ClinicalData, function(err, response) {
    if (err) throw err;
    var ToUpdate={Clinicos:1};
    global.conexion.update('Consultas', ToUpdate,{ID_Consultas:{operator:'=', value:req.body.ID_Consultas}}, function(err, response) {
    if (err) throw err;
      res.json({bandera:true});
      });
  });
});

router.post('/UpdateClinicalInformation/ClinicalInfo', function(req,res,next){
  var ClinicalData={AcidoUrico:req.body.AcidoUrico,Urea:req.body.Urea,Trigliceridos:req.body.Trigliceridos,Sodio:req.body.Sodio,RelacionAG:req.body.RelacionAG,ProteinaTotal:req.body.ProteinaTotal,ProteinaC:req.body.ProteinaC,Potasio:req.body.Potasio,BUN:req.body.BUN,LDH:req.body.LDH,Hierro:req.body.Hierro,MagnesioEnSangre:req.body.MagnesioEnSangre,Glucosa:req.body.Glucosa,Globulinas:req.body.Globulinas,Fosforo:req.body.Fosforo,Creatinina:req.body.Creatinina,Colesterol:req.body.Colesterol,Cloro:req.body.Cloro,CaptacionHierro:req.body.CaptacionHierro,Calcio:req.body.Calcio,Albumina:req.body.Albumina,ID_Consultas:req.body.ID_Consultas};
  global.conexion.update('AnalisisClinicosC', ClinicalData,{ID_Analisis_ClinicosC:{operator:'=', value:req.body.ID_Analisis_ClinicosC}}, function(err, response) {
    if (err) throw err;
      res.json({bandera:true});
      });
  
});
  //GETTING EVERY CLINICAL INFO FROM A PATIENT IN A DETERMINATE SESSION
router.get('/GettingClinicalInfo/:ID_Consultas/', function(req, res) {
   // res.send('Hola ' + req.params.nombre+" "+req.params.nene);
   
   var query="SELECT * FROM AnalisisClinicosC WHERE ID_Consultas="+"'"+req.params.ID_Consultas+"'";
    global.conexion.query(query, function (err, result, fields) {
    if(err) throw err; 
    res.json(result);
          });
});
//==============================Recipe======================================
//Getting ALL MEDICINE IN SYSTEM
router.get('/GettingMedicalInfo',function(req, res){
   var query="SELECT * FROM Medicamento";
   global.conexion.query(query, function(err, result, fields){
      if(err) throw err;
      result.forEach(function(element, index, array) {
        if(element.ID_Medicamento==result[index].ID_Medicamento){
          result[index].Nombre_cantidad=element.Nombre+" "+element.Dosis;
         
        }
      });
      res.json(result);
    })
});
router.get('/GettingActualRecipe/:idConsulta/',function(req,res){
 var query="SELECT * FROM `Recetado` AS R INNER JOIN Medicamento AS M ON R.idMedicamento=M.ID_Medicamento WHERE R.idConsulta="+"'"+req.params.idConsulta+"'"
 global.conexion.query(query, function(err, result, fields){
 if(err) throw err;
   result.forEach(function(element, index, array) {
        if(element.ID_Medicamento==result[index].ID_Medicamento){
          result[index].Nombre_cantidad=element.Nombre+" "+element.Dosis;
          
        }
      });
    res.json(result);
 });
});
//New Recipe
router.post('/NewMedicalRecipe/MedicalRecipe', function(req,res,next){
  var query="SELECT * FROM Recetado";
  var medicinesRecipe=req.body[Object.keys(req.body)[0]];//OBTENEMOS LA PROPIEDAD INACCESABLE POR JSON
  console.log(medicinesRecipe);
  var longitudM=medicinesRecipe.length;
  global.conexion.query(query, function(err, result,fields){
   if(err) throw err;
   console.log(result);
   var bandera=true;
   result.forEach(function(element, index,array){
   
         if(element.idConsulta==req.body.idConsulta && medicinesRecipe==element.idMedicamento){
           bandera=false;
      }  
    
     
   });
   if(bandera){
      insertingNewRecipe(longitudM, medicinesRecipe, req.body);
      var toUpdate={Receta:1};
      global.conexion.update('Consultas', toUpdate,{ID_Consultas:{operator:'=', value:req.body.idConsulta}}, function(err, response) {
    if (err) throw err;
      res.json({bandera:true});
      });
   }else{
    res.json({bandera:false});
   }
          
  });
});
router.post('/UpdatingRecipe/MedicalRecipe', function(req, res, next){
 var query="SELECT * FROM Recetado";
 global.conexion.query(query, function(err, result, fields){
   if(err) throw err;
   if(FindingDuplicateRecipesUpdating(req.body, result)){
     var toUpdate={idMedicamento:req.body.ID_Medicamento,Recomendaciones:req.body.Recomendaciones};
     global.conexion.update('Recetado', toUpdate,{idRecetado:{operator:'=', value:req.body.idRecetado}}, function(err, response) {
    if (err) throw err;
      res.json({bandera:true});
      });
   }else{
    res.json({bandera:false});
   }
 });
});
router.post('/DeleteMedicine/:idRecetado', function(req,res,next){
  var query="DELETE FROM `Recetado` WHERE idRecetado="+"'"+req.params.idRecetado+"'";
  global.conexion.query(query, function(err, result, fields){
    if(err) throw err;
    res.json({bandera:true});
  });
});
//============================================================================
//=================================NewSintomaData=============================
router.post('/CreatingNewSintomaData/SintomaData', function(req,res,next){
  var MedicalHistory={ID_Consultas:req.body.ID_Consultas, Sintomas:req.body.Sintomas, Notas:req.body.Notas, Fecha:req.body.Fecha};
  global.conexion.insert('ExpedienteMedico', MedicalHistory, function(err, response) {
   if(err) throw err;
   var query="SELECT MAX(ID_Expediente_Medico) AS id FROM ExpedienteMedico";
   global.conexion.query(query, function(err, result, fields){
    if(err) throw err;
    var idExpediente=result[0].id;
    var Injuries={ID_Expediente_Medico: idExpediente, AlergiaAlimento: req.body.AlergiaAlimento, AlergiaAlimentoDescripcion: req.body.AlergiaAlimentoDescripcion, AlergiaMedicamento:req.body.AlergiaMedicamento, AlergiaMedicamentoDescripcion:req.body.AlergiaMedicamentoDescripcion, AlergiaOtra:req.body.AlergiaOtra, AlergiaOtraDescripcion:req.body.AlergiaOtraDescripcion, AlergiaPolvo:req.body.AlergiaPolvo, AlergiaPolvoDescripcion:req.body.AlergiaPolvoDescripcion, AlergiaPrurito:req.body.AlergiaPrurito, AlergiaPruritoDescripcion:req.body.AlergiaPruritoDescripcion};
    global.conexion.insert('Alergias', Injuries, function(err, response){
      if (err) throw err;
      var ConsultaToUpdate={Presion_Arterial:req.body.Presion_Arterial,Sintomas1:1};
      global.conexion.update('Consultas', ConsultaToUpdate, {ID_Consultas:{operator:'=', value:req.body.ID_Consultas}}, function(err, response) {
       if(err) throw err;
       res.json({bandera:true});
      });
    });
   });
  });
  // res.json({bandera:true});
  
});
//UpdatingSintomaData
router.post('/UpdatingSintomaData/SintomaData', function(req,res,next){
  var MedicalHistory={ID_Consultas:req.body.ID_Consultas, Sintomas:req.body.Sintomas, Notas:req.body.Notas, Fecha:req.body.Fecha};
  global.conexion.update('ExpedienteMedico', MedicalHistory,{ID_Expediente_Medico:{operator:'=', value:req.body.ID_Expediente_Medico}}, function(err, response) {
      if(err) throw err;
      var Injuries={ID_Expediente_Medico: req.body.ID_Expediente_Medico, AlergiaAlimento: req.body.AlergiaAlimento, AlergiaAlimentoDescripcion: req.body.AlergiaAlimentoDescripcion, AlergiaMedicamento:req.body.AlergiaMedicamento, AlergiaMedicamentoDescripcion:req.body.AlergiaMedicamentoDescripcion, AlergiaOtra:req.body.AlergiaOtra, AlergiaOtraDescripcion:req.body.AlergiaOtraDescripcion, AlergiaPolvo:req.body.AlergiaPolvo, AlergiaPolvoDescripcion:req.body.AlergiaPolvoDescripcion, AlergiaPrurito:req.body.AlergiaPrurito, AlergiaPruritoDescripcion:req.body.AlergiaPruritoDescripcion};
     global.conexion.update('Alergias', Injuries,{ID_Alergias:{operator:'=', value:req.body.ID_Alergias}}, function(err, response) {
       if(err) throw err;
       var ConsultaToUpdate={Presion_Arterial:req.body.Presion_Arterial};
      global.conexion.update('Consultas', ConsultaToUpdate, {ID_Consultas:{operator:'=', value:req.body.ID_Consultas}}, function(err, response) {
       if(err) throw err;
       res.json({bandera:true});
      });
     });
  });
    
});
//getting all sintomaData 
router.get('/GetAllSintomaData/:idConsulta/', function(req,res){
  var query='SELECT * FROM ExpedienteMedico AS E INNER JOIN Alergias AS A ON E.ID_Expediente_Medico=A.ID_Expediente_Medico INNER JOIN Consultas AS C ON E.ID_Consultas=C.ID_Consultas WHERE E.ID_Consultas='+"'"+req.params.idConsulta+"'";
  global.conexion.query(query,function(err, result,fields){
   if(err) throw err;
   res.json(result);
  });
});
//============================================================================
//============================================================================
//======================================Medicine==============================
router.get('/GettingMedicineInfo',function(req, res){
   var query="SELECT * FROM Medicamento WHERE Eliminado=1";
   global.conexion.query(query, function(err, result, fields){
      if(err) throw err;
      res.json(result);
    })
});
router.post('/NewMedicineRegistry/MedicineInfo', function(req,res,next){
  console.log(req.body);
  var MedicalInfo={Nombre: req.body.Nombre, Dosis: req.body.Dosis};
  global.conexion.insert('Medicamento', MedicalInfo,function(err, response){
    if(err) throw err;
    res.json({bandera:true});
  });
});
router.post('/UpdatingMedicines/MedicineInfo', function(req,res,next){
  var MedicalInfo={Nombre: req.body.Nombre, Dosis: req.body.Dosis};
  global.conexion.update('Medicamento', MedicalInfo,{ID_Medicamento:{operator:'=', value:req.body.ID_Medicamento}}, function(err, response) {
    if (err) throw err;
    res.json({bandera:true});
  });
});
router.post('/DeletingMedicine/:ID_Medicamento',function(req, res, next){
  var query="DELETE FROM Medicamento WHERE ID_Medicamento="+"'"+req.params.ID_Medicamento+"'";
  global.conexion.query(query,function(err, result,fields){
   if(err) throw err;
   res.json({bandera:true});
  });
});
//============================================================================
//=======================================Hemodialisis=========================
router.get('/GettingHemodialisisSession/:ID_Cita', function(req,res, next){
 var query="SELECT * FROM Hemodialisis WHERE ID_Cita="+"'"+req.params.ID_Cita+"'";
 global.conexion.query(query, function(err, result, fields){
  if(err) throw err;
  res.json(result);
 });
});
router.post('/NewHemodialisisData/HemoData', function(req, res, next){
  var Hemodialisis={ID_Cita:req.body.ID_Cita, startDate:req.body.startDate, endDate:req.body.endDate, Fecha:req.body.Fecha};
  var startDate=moment(req.body.startDate,'MM-DD-YYYY HH:mm'), endDate=moment(req.body.endDate,'MM-DD-YYYY HH:mm');
    var Today=moment().format('MM-DD-YYYY');
    var Hoy=moment(Today, 'MM-DD-YYYY HH:mm');
    console.log(startDate.isBefore(Hoy));
    if(startDate.isBefore(Hoy)){
     res.json({bandera:false});
    }else{
      var query="SELECT * FROM Hemodialisis";
  global.conexion.query(query, function(err, response){
   if(CheckingDates(req.body, response)){
    global.conexion.insert('Hemodialisis', Hemodialisis, function(err, response){
     if(err) throw err;
     var ConsultaToUpdate={Dialisis:1};
      global.conexion.update('Consultas', ConsultaToUpdate, {ID_Consultas:{operator:'=', value:req.body.idConsulta}}, function(err, response) {
       if(err) throw err;
       res.json({bandera:true});
      });
    });
  }else{
    res.json({bandera:false});
  }
  });
    }
});
router.post('/UpdatingHemodialisisData/HemoData', function(req,res,next){
  var Hemodialisis={ID_Cita:req.body.ID_Cita, startDate:req.body.startDate, endDate:req.body.endDate, Fecha:req.body.Fecha};
  var startDate=moment(req.body.startDate,'MM-DD-YYYY HH:mm'), endDate=moment(req.body.endDate,'MM-DD-YYYY HH:mm');
    var Today=moment().format('MM-DD-YYYY');
    var Hoy=moment(Today, 'MM-DD-YYYY HH:mm');
    if(startDate.isBefore(Hoy)){
     res.json({bandera:false});
    }else{
       var query="SELECT * FROM Hemodialisis";
  global.conexion.query(query, function(err, response){
    if(CheckingDatesUpdating(req.body,response)){
      global.conexion.update('Hemodialisis', Hemodialisis, {ID_Hemodialisis:{operator:'=', value:req.body.ID_Hemodialisis}}, function(err, response){
              if(err) throw err; 

              res.json({bandera: true});
      });
    }else{
    res.json({bandera:false});
    }
  });
    }
});
router.get('/GetAllHemodialisisSession', function(req,res,next){
 var query="SELECT * FROM Hemodialisis";
 global.conexion.query(query, function(err, response){
  if (err) throw err;
  var ToReturn=[];
  response.forEach(function(element, index,array){
    var startD=moment(element.startDate,'MM-DD-YYYY HH:mm'), endD=moment(element.endDate,'MM-DD-YYYY HH:mm'), startDate=moment().format('MM-DD-YYYY HH:mm');;
    var diff = moment.preciseDiff(startD, startDate, true);
    if(diff.years==0&&diff.days==0){
        ToReturn[index]=element;
    }
  });
  res.json(ToReturn);
 });
});
router.get('/GetAllHemodialisisSessionUpd/HemoData', function(req,res,next){
 var query="SELECT * FROM Hemodialisis";
 global.conexion.query(query, function(err, response){
  if (err) throw err;
  var ToReturn=[];
  response.forEach(function(element, index,array){
    var startD=moment(element.startDate,'MM-DD-YYYY HH:mm'), endD=moment(element.endDate,'MM-DD-YYYY HH:mm'), startDate=moment(req.body.startDate,'MM-DD-YYYY HH:mm');
    var diff = moment.preciseDiff(startD, startDate, true);
    if(diff.years==0&&diff.days==0){
        ToReturn[index]=element;
    }
  });
  res.json(ToReturn);
 });
});
//====================================FinishSchetch===========================
router.get('/FinishSchetch/:ID_Consultas', function(req,res,err){
 var ToUpdate={Terminado:0};
 global.conexion.update('Consultas',ToUpdate,{ID_Consultas:{operator:'=', value:req.params.ID_Consultas}}, function(err, response){
 if(err) throw err;
 res.json({bandera:true});
 });
});
//============================================================================
router.get('/GettingTimes/:HemoDuration', function(req,res, next){
  var array=[];
  var query="SELECT * FROM Consultas";
  global.conexion.query(query, function(err, response){
   if(err) throw err;
   var m1 = moment('2011-01-01 12:00:00','YYYY-MM-DD HH:mm');
   var m2 = moment('2011-01-01 14:00:00','YYYY-MM-DD HH:mm');
   var diff = moment.preciseDiff(m1, m2, true);
   res.json(diff);
   //10-21-2018 12:00
   
  });
  /*var startDate="2017-03-14 "
  var myDate = "2017-04-14 00:00:00"; 
  var myDay =  "2017-04-14 15:00:00"
var status = moment(myDate).add(22, 'hours').format('YYYY-MM-DD HH:mm:ss');
  for(var i=1; i<25;i++){
    console.log("sumo i "+ i);
    var mom2= moment(myDate).add(i, 'hours').format('YYYY-MM-DD HH:mm');
   array[i]=mom2;
  }

  res.json(array);*/
});
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
    if(DataTwo.ID_Contacto_Emergencia!=DataFromForm.ID_Contacto_Emergencia){
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
async function CheckingDates(data, AllData){
   var bandera=true;
  AllData.every(function(element, index,array){
    //var m1 = moment('2011-01-01 12:00:00','MM-DD-YYYY HH:mm');
   
    var startD=moment(element.startDate,'MM-DD-YYYY HH:mm'), endD=moment(element.endDate,'MM-DD-YYYY HH:mm'), startDate=moment(data.startDate,'MM-DD-YYYY HH:mm'), endDate=moment(data.endDate,'MM-DD-YYYY HH:mm');
    var diff = moment.preciseDiff(startD, startDate, true);
    var Today=moment().format('MM-DD-YYYY');
    var Hoy=moment(Today, 'MM-DD-YYYY HH:mm');

    //var diff = moment.preciseDiff(m1, m2, true);
   if(startDate.isAfter(startD)&&startDate.isBefore(endD) || endDate.isAfter(startD)&&endDate.isBefore(endD)){
     bandera=false;
     return false;
    }else if(diff.years==0&&diff.months==0&&diff.days==0){
       if(diff.hours==0){
        bandera=false;
        return false;
       }
    }
  });

  
   return bandera;
  
}
function CheckingDatesUpdating(data,AllData){
  var bandera=true,banderaChica=false,banderaHoy=true;
  AllData.every(function(element, index,array){
    if(element.ID_Hemodialisis==data.ID_Hemodialisis){
      var startD=moment(element.startDate,'MM-DD-YYYY HH:mm'), endD=moment(element.endDate,'MM-DD-YYYY HH:mm'), startDate=moment(data.startDate,'MM-DD-YYYY HH:mm'), endDate=moment(data.endDate,'MM-DD-YYYY HH:mm');
      var diff = moment.preciseDiff(startD, startDate, true);
      var diff2= moment.preciseDiff(endD, endDate, true);
      var Today=moment().format('MM-DD-YYYY');
      var Hoy=moment(Today, 'MM-DD-YYYY HH:mm');
      if(startDate.isBefore(Hoy)){
        console.log("entro");
        banderaHoy=false;
        return false;
      }
      else if(diff.years==0&&diff.months==0&&diff.days==0&&diff.hours==0&&diff.minutes&&diff2.years==0&&diff2.months==0&&diff2.days==0&&diff2.hours==0&&diff2.minutes==0){
          console.log("entro x2");
          banderaChica=true;
      }
    }
      var startD=moment(element.startDate,'MM-DD-YYYY HH:mm'), endD=moment(element.endDate,'MM-DD-YYYY HH:mm'), startDate=moment(data.startDate,'MM-DD-YYYY HH:mm'), endDate=moment(data.endDate,'MM-DD-YYYY HH:mm');
    var diff = moment.preciseDiff(startD, startDate, true);
    var Today=moment().format('MM-DD-YYYY');
    var Hoy=moment(Today, 'MM-DD-YYYY HH:mm');
    //var diff = moment.preciseDiff(m1, m2, true);
    if(startDate.isAfter(startD)&&startDate.isBefore(endD) || endDate.isAfter(startD)&&endDate.isBefore(endD)){
     bandera=false;
     return false;
    }else if(diff.years==0&&diff.months==0&&diff.days==0){
       if(diff.hours==0){
        bandera=false;
        return false;
       }
      }else if(startDate.isBefore(Hoy)){
        bandera=false;
        return false;
      }
    
  });
  console.log(banderaChica+" "+bandera);
  if(banderaChica){
    return banderaChica;
  }else if(!banderaHoy){
   return banderaHoy;
  }else{
    return bandera;
  }
}
 function FindingDuplicateRecipesUpdating(DataFromForm, AllData){
  var bandera=true;
  AllData.forEach(function(element, index,array){
    if(element.idMedicamento==DataFromForm.ID_Medicamento && element.idRecetado!=DataFromForm.idRecetado){
      bandera=false;
    }
  });
  if(bandera){
    return true;
  }else{
    return false;
  }
 }
function FindingDuplicateMedicines(DataFromForm,AllData){
  var bandera=true; 
  var DataOne=underscore.findWhere(AllData,{idConsulta:DataFromForm.idConsulta});
  var DataTwo=underscore.findWhere(AllData,{idMedicamento:DataFromForm.idMedicamento});
  if(DataOne!=undefined){
    bandera=false;
  }
  if(bandera){
    return true;
  }else{
    return false;
  }
}
 function insertingNewRecipe(lenght,recipes, ToInsert){
   
       global.conexion.insert('Recetado', {idConsulta:ToInsert.idConsulta, idMedicamento:recipes, Recomendaciones:ToInsert.Recomendaciones}, function(err, response) {
         if(err) throw err;
       });
   
 }









module.exports = router;