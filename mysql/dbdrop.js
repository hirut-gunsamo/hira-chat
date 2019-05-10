var mysql = require('mysql');
require('dotenv').load();


let config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  connectTimeout: 60000
};

var connection = mysql.createConnection(config);


connection.connect((err)=>{
  if(err) throw err.message;
  else{
    connection.query('DROP DATABASE IF EXISTS ' + process.env.DB_NAME, (err, result)=>{
      if(err) throw err.message;
      console.log('Database dropped');
      connection.end((err)=>{
        if(err) throw err.message;
      })
    })
  }
})
