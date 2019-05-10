var mysql = require('mysql');
var app = require('express')();





app.post('/email', function (req, res, next) {
  res.locals.connection.query('SELECT * from User_detail where email = ?', req.body.email, function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error,
        "response": null
      }));
    } else {
      if(results.length){
        res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": {exists: true}
        }))
      }else{
        res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": {exists: false}
        }));

      }
    }
  });
});
app.post('/username', function (req, res, next) {
  res.locals.connection.query('SELECT * from Users where username = ?', req.body.username, function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error,
        "response": null
      }));
    } else {
      if(results.length){
        res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": {exists: true}
        }))
      }else{
        res.send(JSON.stringify({
          "status": 200,
          "error": null,
          "response": {exists: false}
        }));

      }
    }
  });
});


module.exports = app;
