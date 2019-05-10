var express = require('express');
var mysql = require('mysql');
var passwordHash = require('password-hash');
var verify = require('./verify');

var app = express();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


app.use('/verify', verify);

app.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * from Users', function (error, results, fields) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error,
        "response": null
      }));
    } else {
      res.send(JSON.stringify({
        "status": 200,
        "error": null,
        "response": results
      }));
    }
  });
});

app.post('/', function (req, res, next) {
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      if (key == 'internationalCode' || key == 'phone') {
        req.body[key] = req.body[key].toString().replace(/\+/g, '').replace(/-/g, '').replace(/ /g,'');
      }
      req.body[key] = req.body[key].trim();
    }
  }
  req.body.firstName = capitalizeFirstLetter(req.body.firstName);
  req.body.lastName = capitalizeFirstLetter(req.body.lastName);
  req.body.companyName = capitalizeFirstLetter(req.body.companyName);

  let userDetail = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    country: req.body.country,
    city: req.body.country,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    address1: req.body.address1,
    address2: req.body.address2,
    international_code: req.body.internationalCode,
    phone: req.body.phone,
    company_name: req.body.companyName,
    company_size: req.body.companySize,
    business_practice_area: req.body.businessPracticeArea
  };
  let user = {
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
    type: 'vendor'
  }
  res.locals.connection.query('INSERT INTO User_detail SET ?', userDetail, function (error, results) {
    if (error) {
      res.send(JSON.stringify({
        "status": 500,
        "error": error,
        "response": null
      }));
    } else {
      res.locals.connection.query('SELECT * FROM User_detail where email = ?', userDetail.email, function (error, idResult) {
        if (error) {
          res.locals.connection.query('DELETE FROM  User_detail where email = ?', userDetail.email, (err, results) => {
            if (err) throw err;
          })
          res.send(JSON.stringify({
            "status": 500,
            "error": error,
            "response": null
          }));
        } else {

          // Assign foreign key
          user.ID = idResult[0].ID;

          res.locals.connection.query('INSERT INTO Users SET ?', user, function (error, results) {
            if (error) {
              res.locals.connection.query('DELETE FROM  User_detail WHERE ID = ?', user.ID, (err, results) => {
                if (err) throw err;
              })
              res.send(JSON.stringify({
                "status": 500,
                "error": error,
                "response": null
              }));
            } else {
              res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": results
              }));
            }
          })

        }
      })
    }
  })



});
module.exports = app;
