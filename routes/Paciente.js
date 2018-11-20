var express = require('express');
var router = express.Router();
var underscore=require('underscore');
var moment= require('moment');
var moment1 = require('moment-precise-range-plugin');
var moment2=require('moment-range');

router.get('/', function(req, res, next) {
  //res.render('Enfermero/Prueba', { title: 'Bienvenido', otroTexto: 'Medico' });

  res.render('Patient/indexPatient', { title: 'Bienvenido', otroTexto: 'Enfermero' });
});
//=======================================Avance=======================================
  router.get('/MiAvance', function(req, res, next) {
  //res.render('Enfermero/Prueba', { title: 'Bienvenido', otroTexto: 'Medico' });

  res.render('Patient/Avance/Avance', { title: 'Mis avances', otroTexto: 'Enfermero' });
  });
  router.get('/GetMonths',function(req,res,next){
  	  var Today=moment().format('YYYY');
  	  var meses=[{Mes:"Enero", Fecha:"01-01-"+Today, Año:Today},{Mes:"Febrero", Fecha:"02-01-"+Today, Año:Today},{Mes:"Marzo", Fecha:"03-01-"+Today, Año:Today}
  	              ,{Mes:"Abril", Fecha:"04-01-"+Today, Año:Today},{Mes:"Mayo", Fecha:"05-01-"+Today, Año:Today},{Mes:"Junio", Fecha:"06-01-"+Today, Año:Today},
  	              {Mes:"Julio", Fecha:"07-01-"+Today, Año:Today},{Mes:"Agosto", Fecha:"08-01-"+Today, Año:Today},{Mes:"Septiembre", Fecha:"09-01-"+Today, Año:Today},
  	               {Mes:"Octubre", Fecha:"10-01-"+Today, Año:Today},{Mes:"Noviembre", Fecha:"11-01-"+Today, Año:Today},{Mes:"Diciembre", Fecha:"12-01-"+Today, Año:Today} ]
      res.json(meses);
  });
   router.get('/GetCreatininaData/:CreatiDate',function(req,res,next){
      var Today=moment(req.params.CreatiDate,'MM-DD-YYYY');
      var d = moment(req.params.CreatiDate);
      console.log(Today.month());
  	  var query="SELECT * FROM Hemodialisis AS H INNER JOIN Datos_Bioquimicos_Sistema AS DB ON H.ID_Hemodialisis=DB.ID_Hemodialisis INNER JOIN Citas AS C ON H.ID_Cita=C.ID_Citas INNER JOIN Usuario AS U ON C.ID_Paciente=U.IdUsuario WHERE U.IdUsuario=40"//<---AQUÍ CAMBIA POR LA SESIÓN
  	  global.conexion.query(query,function(err,result,field){
  	  	var ValueToGrafic=[];
        if(err) throw err;
         result.forEach(function(element, index, array) {
         	var startD=moment(element.Fecha,'MM-DD-YYYY');
            var diff = moment.preciseDiff(startD, Today, true);
            if(Today.month()==startD.month()&&diff.years==0){
            	if(element.Periodo=="Inicial"){
               var Graffic={Fecha:element.Fecha,Periodo:element.Periodo,ValorIni:element.Valor,IFG:element.IFG};
               ValueToGrafic[index]=Graffic;
            	}else{
               var Graffic={Fecha:element.Fecha,Periodo:element.Periodo,ValorFi:element.Valor,IFG:element.IFG};
               ValueToGrafic[index]=Graffic;
            	}
            
            }
         });
        res.json(ValueToGrafic);
  	  }); 
  });
   router.get('/GetCreatininaInfo/:CreatiDate',function(req,res,next){
     var Today=moment(req.params.CreatiDate,'MM-DD-YYYY');
      var d = moment(req.params.CreatiDate);
      console.log(Today.month());
  	  var query="SELECT * FROM Hemodialisis AS H INNER JOIN Datos_Bioquimicos_Sistema AS DB ON H.ID_Hemodialisis=DB.ID_Hemodialisis INNER JOIN Citas AS C ON H.ID_Cita=C.ID_Citas INNER JOIN Usuario AS U ON C.ID_Paciente=U.IdUsuario WHERE U.IdUsuario=40"//<---AQUÍ CAMBIA POR LA SESIÓN
  	  global.conexion.query(query,function(err,result,field){
  	  	if(err) throw err;
  	  	var ValueToGrafic=[];
  	  	result.forEach(function(element, index, array) {
         	var startD=moment(element.Fecha,'MM-DD-YYYY');
            var diff = moment.preciseDiff(startD, Today, true);
            if(Today.month()==startD.month()&&diff.years==0){
            	var sstartD=moment(element.startDate,'MM-DD-YYYY HH:mm'), endD=moment(element.endDate,'MM-DD-YYYY HH:mm');
            	var diff2=moment.preciseDiff(sstartD, endD, true);
             var Graffic={Fecha:element.Fecha,Valor:element.Valor,IFG:element.IFG,Periodo:element.Periodo,Horas:diff2.hours};
               ValueToGrafic[index]=Graffic;
            
            }
         });
  	  	res.json(ValueToGrafic);
  	  });
   });
    router.get('/Prueba',function(req,res,next){
   	 var startD=moment('12-01-2018','MM-YYYY'), Today=moment('11-01-2018','MM-YYYY');
   	 var diff = moment.preciseDiff(startD, Today, true);
   	 res.json(diff);
  });
//====================================================================================
//=======================================Recetas======================================
  router.get('/MyMedicalRecipes', function(req, res, next) {
  //res.render('Enfermero/Prueba', { title: 'Bienvenido', otroTexto: 'Medico' });

  res.render('Patient/MisRecetas/MisRecetas', { title: 'Mis recetas', otroTexto: 'Enfermero' });
  });
  router.get('/GetSchetch/:Date', function(req, res, next) {
   var Today=moment(req.params.Date,'MM-DD-YYYY');
   var query="SELECT * FROM Citas AS C INNER JOIN Consultas AS CC ON C.ID_Citas=CC.ID_Cita INNER JOIN Usuario AS U ON U.IdUsuario=C.ID_Personal_Salud LEFT JOIN PersonalSalud AS PS ON U.IdUsuario=PS.ID_Personal_Salud WHERE CC.Receta=1 AND C.ID_Paciente=40"; //Se debe cambiar por la sesión
   global.conexion.query(query,function(err,result,field){
   	if (err) throw err;
   	var ValueToGrid=[];
   	result.forEach(function(element, index, array) {
     var startD=moment(element.Fecha,'MM-DD-YYYY');
    var diff = moment.preciseDiff(startD, Today, true);
    if(Today.month()==startD.month()&&diff.years==0){
     ValueToGrid[index]=element;
    }
   	});
   	res.json(ValueToGrid);
   });
  });
  router.get('/GetSchetchMedicine/:ID_Consultas',function(req,res,next){
   var query="SELECT * FROM Consultas AS C INNER JOIN Recetado AS R ON C.ID_Consultas=R.idConsulta LEFT JOIN Medicamento AS M ON R.idMedicamento=M.ID_Medicamento INNER JOIN Citas AS CC ON C.ID_Cita=CC.ID_Citas WHERE CC.ID_Paciente=40"//Se debe cambiar por la sesión 
   global.conexion.query(query, function(err,result,field){
    if(err) throw err;
    res.json(result);
   });
  });
//====================================================================================
//=====================================MisDatos=======================================
  router.get('/MisDatosPersonales', function(req, res, next) {
  //res.render('Enfermero/Prueba', { title: 'Bienvenido', otroTexto: 'Medico' });

  res.render('Patient/MisDatos/MisDatos', { title: 'Mis datos', otroTexto: 'Enfermero' });
  });
  router.get('/GetMyData',function(req,res,next){
   var query="SELECT * FROM Usuario AS U INNER JOIN Domicilio AS D ON U.IdUsuario=D.IdUsuario INNER JOIN Paciente AS P ON U.IdUsuario=P.ID_Paciente WHERE U.IdUsuario=40";//Se debe cambiar por la sesión 
   global.conexion.query(query, function(err,result,field){
    if(err) throw err;
    res.json(result[0]);
   });
  });
   

//====================================================================================
module.exports = router;