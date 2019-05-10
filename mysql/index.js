var express = require('express');
var mysql = require('mysql');
var mysql = require('mysql');
var config = require('../dbconfig');
var user = require('./user');

var app = express();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});



// Establishing Database connection
app.use((req, res, next) => {
  res.locals.connection = mysql.createConnection(config);
  res.locals.connection.connect();
  next();
});

app.use('/user', user)


module.exports = app;
