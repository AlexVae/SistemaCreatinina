const mysql_mongo = require('mysql-mongo-db')
 
const mysql = mysql_mongo.createDB('MySQL')

let config = { host: 'localhost', user: 'root', pass: '', db: 'infoBlood' }
mysql.connect(config, err => {
  if(err) throw err
  console.log(`Connected in ${config.host}/${config.db}`)
})
var x='1';
let selectParams = {where: 'UserName ='+'AlexVaee'}
let columns = ['UserName', 'Pass']
mysql.select('Usuarios', columns, selectParams, (err, res, fields) => {
      if (err) {
       console.log("erroooooooooooooor");
       throw err
      }else{
      	console.log("Registro encontrado");
       var resultado=res[0];
      console.log(resultado.UserName+" "+resultado.Pass) 
      }
      
    })
//[ RowDataPacket { UserName: 'AlexVae', Pass: 'Bin6677' } ]