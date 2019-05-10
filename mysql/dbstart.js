var mysql = require('mysql')
require('dotenv').load();

let config = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  connectTimeout: 60000,
};

var connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) throw err
  console.log('INITIALIZING DATABASE AND TABLES')
  connection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME, function (err, result) {
    if (err) throw err;
    // console.log('Database created');
  });
  connection.query('USE ' + process.env.DB_NAME, function (err, result) {
    if (err) throw err;
    // console.log('Database ' + process.env.DB_NAME + ' selected');
  });

  connection.query(`CREATE TABLE IF NOT EXISTS User_detail(ID INT PRIMARY KEY AUTO_INCREMENT,
        firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address1 VARCHAR(255) NOT NULL, address2 VARCHAR(255) DEFAULT NULL,
        country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL, zip TEXT NOT NULL,
        international_code TEXT NOT NULL, phone TEXT NOT NULL,
        company_name VARCHAR(255) NOT NULL,company_size VARCHAR(255) DEFAULT NULL,
        business_practice_area VARCHAR(255) DEFAULT NULL  )`,
    function (err, result) {
      if (err) throw err
      // console.log('table USERDETAIL created');



    });
  connection.query(`CREATE TABLE IF NOT EXISTS Users(ID INT,PRIMARY KEY(ID),
    FOREIGN KEY (ID) REFERENCES User_detail(id), username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL)`,
    function (err, result) {
      if (err) throw err
      // console.log('table USETS created');

      // Ends the connection
      connection.end(function (err) {
        if (err) {
          return console.log(err.message);
        }
      });
      console.log('INITIALIZATION FINISHED');
    });
});
