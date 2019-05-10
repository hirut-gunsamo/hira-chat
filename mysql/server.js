// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');
const path = require('path');
const config = require('./dbconfig')


// create an instance of express
const app = express();

// configure body-parser to accept
// urlencoded bodies and json data

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

//  to allow all cors origin
app.use(cors())


//serving index.html from dist
app.use(express.static(path.join(__dirname + '/dist/freelance-site')));

//serving data from public
app.use('/server/public/images', express.static(path.join(__dirname + '/server/public/images')));


// Database and table setup
require('./dbstart');

// route registration
app.use('/api', require('./server/index'));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/freelance-site/index.html'));
});

// error handling

// 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Resource not found'
  });
});

// 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message
  });
});

// set the port to use
const port = parseInt(process.env.NODEPORT, 10) || 3000;



// Start Express Server
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
