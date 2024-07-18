const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
   host : 'localhost',
   user: 'root',
   password: 'Jyoti@123',
   database: 'users'
})

 mysqlConnection.connect((err)=>{
  if(err){
    console.log('Errpr in DB '+JSON.stringify(err,undefined,2));
  }
  else{
    console.log('DB connected')
  }
})
module.exports= mysqlConnection