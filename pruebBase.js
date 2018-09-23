var MysqlJson = require('mysql-json');
  var mysqlJson = new MysqlJson({
    host:'localhost',
    user:'root',
    password:'',
    database:'Muebleria'
  });
var x={
"idUsuario": 6,
"Usuario": "Benitezz",
"Contraseña":"1234984",
"Tipo":"Admin"
};
mysqlJson.connect(function(err) {
  if (err) throw err;
 /* mysqlJson.insert('Usuarios', x, function(err, response) {
    if (err) throw err;
    console.log(response);
  });*/
//});
var xx=9;
  //var query='SELECT * FROM Usuarios WHERE idUsuario=6 AND Usuario='+"'"+x.Usuario+"'";
  var query="SELECT * FROM Usuarios"
  console.log(query);
  mysqlJson.query(query, function (err, result, fields) {
    if (err) throw err;
    var x=[{dedos:"uno"}];
    /*$.each(result, function (index, valor) {
            result[index]=valor.concat(x[0]);
                });*/
    console.log(result);
  });


});