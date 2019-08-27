var express = require('express');
var jsonParser = require("body-parser").json();
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

var server = require("http").Server(app);
var io = require("socket.io")(server);


server.listen(8000, function () {
  console.log("Server running");
});

app.get('/', (req, res) => res.render('home'));


io.on('connection', function (socket) {
  console.log('a user connected : ' + socket.id);
});

app.post('/signin', jsonParser, (req, res) => {
  var username = req.body.fullname;
  var password = req.body.password;
  if (username == "admin" && password == "123") {
    //mangonl.push(username);
    //mangUser.push(username);
    res.send('success1');
  }
  else {
    res.send('Failure');
  }
});