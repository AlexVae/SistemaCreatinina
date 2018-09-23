var express = require('express')
var app = express()
 
// Including 'mysql-no-query' package.
var mysqlNoQuery = require('mysql-no-query') 
 
// Connecting to database.
var db = new mysqlNoQuery();
db.connect({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'infoBlood'
})
app.listen(8888);
db.schema.Usuarios.get({}, (error, results, fields) => {
    res.end(JSON.stringify(results))
  })