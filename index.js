var express = require('express');
var socket = require('socket.io');

var app= express();

var server = app.listen(3000, function(){

    console.log("server is listen on port 3000");

});
//static files
app.use(express.static('public'));
//socket setup

// root addres
app.get('/', (req, res)=> {
  // send or render the login page
  res.sendFile(__dirname + '/public/login.html');
})





// signup page addres
app.get('/signup', (req, res)=> {
  // send or render the signup page
  res.sendFile(__dirname + '/public/signup.html')
})



// signup page addres
app.get('/chat', (req, res)=> {
  // send or render the chat page
  res.sendFile(__dirname + '/public/chat.html');
})



var io = socket(server);
io.on('connection', function(socket){
  console.log(socket);
});
 
