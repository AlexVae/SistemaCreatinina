var MysqlJson = require('mysql-json');
  var mysqlJson = new MysqlJson({
    host:'localhost',
    user:'root',
    password:'',
    database:'Muebleria'
  });

mysqlJson.connect(function(err) {
  if (err) throw err;
  mysqlJson.query("SELECT * FROM Usuarios", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


