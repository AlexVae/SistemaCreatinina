var express = require('express');
var router = express.Router();
var underscore=require('underscore');
var moment= require('moment');
//======================Start=======================
router.get('/', function(req, res, next) {
  //res.render('Enfermero/Prueba', { title: 'Bienvenido', otroTexto: 'Medico' });

  res.render('Enfermero/indexEnf', { title: 'Bienvenido', otroTexto: 'Enfermero' });
});

router.get('/Hemodialisis', function(req, res, next) {
  res.render('Enfermero/Hemodialisis/Hemodialisis', { title: 'Sesión de hemodiálisis', otroTexto: 'Medico' });
});

//=====================Consultas========================

//Views
router.get('/Consultas', function(req, res, next) {
 //res.json({bandera:true});
 // res.render('Enfermero/Consultas', { title: 'Bienvenido', otroTexto: 'Enfermero' });
 res.render('Enfermero/Consultas/Consulta', { title: 'Registro de consulta médica', otroTexto: 'Enfermero' });
});
/////////////////////////////////////////////////////////
//==================Getting All Data for grids or boxes====================
 router.get('/GetAllSchechDates',function(req,res,next){
  var query1="SELECT * FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas=CC.ID_Cita AND CC.Terminado=1 INNER JOIN PersonalSalud AS P ON C.ID_Personal_Salud=P.ID_Personal_Salud LEFT JOIN Usuario AS U ON C.ID_Personal_Salud=U.IdUsuario";
  var query2="SELECT * FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas=CC.ID_Cita AND CC.Terminado=1 INNER JOIN Paciente AS P ON C.ID_Paciente=P.ID_Paciente LEFT JOIN Usuario AS U ON C.ID_Paciente=U.IdUsuario";
 global.conexion.query(query1, function (err, result, fields) {
    if(err) throw err; 
    var Schech=result;
    global.conexion.query(query2,function(err,result,fields) {
      if(err) throw err; 
      Schech.forEach(function(element, index, array) {
             if(element.ID_Paciente==result[index].ID_Paciente){
             	element.Nombre_Paciente=result[index].Nombre_Usuario;
             	element.Apellido_Paterno_paciente=result[index].Apellido_Paterno_usuario;
             	element.Apellido_Materno_paciente=result[index].Apellido_Materno_usuario;
             	element.Correo_paciente=result[index].Correo_usuario;
             	//console.log(element.Fecha.getFullYear());
             }   

        });
      //console.log(Schech);

        res.json(Schech);

    });
});
  /*  global.conexion.query(query2, function (err, result, fields) {
    if(err) throw err; 

  });*/
});
//Getting all available doctors
 router.get('/GetAllHealty',function(req, res,next){
 var query="SELECT * FROM Usuario AS U INNER JOIN PersonalSalud AS P ON U.IdUsuario=P.ID_Personal_Salud LEFT JOIN Tipo AS T ON P.ID_Tipo=T.ID_Tipo AND U.Eliminado=1";
 global.conexion.query(query,function(err,result,fields){
 if(err) throw err;
 res.json(result);
 });
 });

//Getting all available patients
 router.get('/GetAllPatients',function(req, res,next){
 var query="SELECT * FROM Usuario AS U INNER JOIN Paciente AS P ON U.IdUsuario=P.ID_Paciente AND U.Eliminado=1";
 global.conexion.query(query,function(err,result,fields){
 if(err) throw err;
 res.json(result);
 });
});
//====================================================================

//=============================NewRegistrys===========================
router.post('/NewSchechHealty/SchechInfo', function(req, res, next) {
	var queryS="SELECT * FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas=CC.ID_Cita AND CC.Terminado=1 WHERE C.ID_Personal_Salud="+"'"+req.body.IdUsuario+"'";
	global.conexion.query(queryS,function(err,result,fields){
           if (err) throw err;
           CheckingExistingDates(req.body,result);
          /* if(CheckingExistingDates(req.body,result)){
           	if(CheckingLessDates(req.body.Fecha)){
 	console.log(req.body);
      var DateToInsert={ID_Paciente:req.body.ID_Paciente,ID_Personal_Salud:req.body.IdUsuario};
      global.conexion.insert('Citas',DateToInsert, function(err, response) {
       if (err) throw err;
       var query="SELECT MAX(ID_Citas) AS id FROM Citas";
       global.conexion.query(query, function (err, result, fields) {
         var idToRegister=result[0].id;
         var SchechToInsert={ID_Cita:idToRegister, Fecha:req.body.Fecha,FechaT:req.body.FechaT};
         global.conexion.insert('Consultas',SchechToInsert, function(err, response) {
          if (err) throw err;
          CheckingLessDates(SchechToInsert.Fecha);
          res.json({bandera:true})
         });
       });
        
     });
 }else{
 	res.json({bandera:false});
 }

           }else{
           	res.json({bandera:false});
           }*/
	});


});


//====================================================================
//==========SupportFunctions==========================================
function CheckingLessDates(DateToCompare){
 var Today=moment().format('MM-DD-YYYY');
 var SchechDate=moment(DateToCompare).format('MM-DD-YYYY');
 //console.log(Today+" "+SchechDate);
 var bandera=moment(Today).isSameOrBefore(moment(SchechDate));
 //console.log(bandera);
 if(bandera){
 	return true;
 }else{
 	return false;
 }
 


}
//Checking if theres existing dates or differences that could not be possible.
function CheckingExistingDates(DataFromForm,AllData){
   //var DataToVerify=underscore.findWhere(AllData,{ID_Numero_Poliza:DataFromForm.ID_Numero_Poliza});
   var bandera=true;
   AllData.forEach(function(element, index, array) {
          var Schetch=moment(DataFromForm.Fecha).format('MM-DD-YYYY HH:mm');
                var ToCompare=moment(element.Fecha).format('MM-DD-YYYY HH:mm');
                var diferencia=moment(ToCompare).diff(moment(Schetch), 'hours');
                console.log(Schetch+" "+ToCompare)
              /*  if(diferencia>0){
                  console.log("No pasas "+Schetch+" "+diferencia);
                }else if(diferencia<0){
                	console.log("Si pasas "+" "+Schetch+" "+diferencia);
                  diferencia=true;
                }*/

        });
   return bandera;
}

//==========HARDWARE==================================================

router.get('/HardwareOrder', function(req, res, next) {
	res.json({idH:15,periodo:"Inicial"});
});

//====================================================================
































module.exports = router;