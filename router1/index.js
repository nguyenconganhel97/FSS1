var express = require('express');
var jsonParser = require("body-parser").json();
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
var mysql = require('mysql');

var server = require("http").Server(app);
var io = require("socket.io")(server);


server.listen(8000, function () {
  console.log("Server running");

});

var a = 20;
var b = 20;
var matrix = [];
for (var i = 0; i < a; i++) {
  var row = [];
  for (var j = 0; j < b; j++) {
    row.push(0);
  }
  matrix.push(row);
}
var listIdSocket = [];

app.get('/', (req, res) => res.render('home'));


io.on('connection', function (socket) {
  app.post('/signin', jsonParser, (req, res) => {
    var un = req.body.fullname;
    var ps = req.body.password;
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "caro"
    });


    con.connect(function (err) {
      if (err) throw err;
      con.query("SELECT * FROM user ", function (err, result, fields) {
        if (err) { throw err; }

        for (var i = 0; i < result.length; i++) {
          if (result[i]["name"] == un && result[i]["password"] == ps) {
            socket.userName = un;
            listIdSocket.push(socket.id);
            res.send('success1');
            console.log('ok');
            return con;
          }

        }
        res.send('acb');
        return con;
      });
    });
  });

  console.log('a user connected : ' + socket.id);
  // socket.userName = socketUsername;

  socket.on("client-send-active", function (data) {
    console.log("Client said : " + data);
    socket.emit("server-send-active", "OK");
  });
  socket.on("abc", function (data) {
    console.log("vlueeeee : " + data);
  });
  socket.on("client-send-name-room", function (data) {
    // console.log("Nam room : " + data);
    // listUserRoom.push(socket.Username);
    socket.join(data);
    socket.nameRoom = data;
    socket.emit("server-send-name-room", socket.nameRoom);
    console.log("========");
    // console.log(io.sockets.adapter.rooms.Room);
    for (var x in io.sockets.adapter.rooms) {
      console.log(x);
      // console.log(io.sockets.clients(x));
    }
    console.log("-------");
    var u = io.sockets.adapter.rooms[data].sockets;
    console.log(io.sockets.adapter.rooms[data].sockets);
    console.log(typeof u);
    console.log("--------");
    // io.sockets.in(socket.nameRoom).emit("server-send-user-in-room", listUserRoom);


    listRoom = [];
    for (var x in socket.adapter.rooms) {
      listRoom.push(x);
    }
    console.log(listRoom);
    for (var i = 0; i < listIdSocket.length; i++) {
      var index = listRoom.indexOf(listIdSocket[i]);
      if (index > -1) {
        listRoom.splice(index, 1);
      }
      console.log("value : " + listIdSocket[i]);
      // console.log(listIdSocket[i]);
    }
    console.log(listRoom);
    io.sockets.emit("server-send-list-room", listRoom);
  });
  socket.on("client-send-cell", function (data) {
    console.log(data);
    matrix[data.row][data.col] = data.value;
    io.sockets.emit("server-send-cell", data);
    // io.sockets.in(socket.nameRoom).emit("server-send-cell", data);
    var result = checkwin(data.value, data.row, data.col);
    if (result != undefined) {
      console.log("End game : " + result);
      // io.sockets.in(socket.nameRoom).emit("server-send-result", result);
      io.sockets.emit("server-send-result", result);
      matrix = [];
      for (var i = 0; i < a; i++) {
        var row = [];
        for (var j = 0; j < b; j++) {
          row.push(0);
        }
        matrix.push(row);
      }
      console.log(matrix);
    }
  });
});

function checkwin(numberCheck, trow, tcol) {
  var leftEnd = false, rightEnd = false, topEnd = false, botEnd = false, topLeftEnd = false, botRightEnd = false, topRightEnd = false, botLeftEnd = false;
  var countLeft = 0, countRight = 0, countTop = 0, countBot = 0, countTopLeft = 0, countBotRight = 0, countTopRight = 0, countBotLeft = 0;
  var k = (numberCheck == 1) ? "X" : "O";
  for (var i = 1; i < 5; i++) {
    //hàng ngang
    if ((tcol - i) >= 0)
      if (matrix[trow][tcol - i] == numberCheck && !leftEnd) {
        countLeft++;
      } else {
        leftEnd = true;
      }
    if ((tcol + i) < 20)
      if (matrix[trow][tcol + i] == numberCheck && !rightEnd) {
        countRight++;
      } else {
        rightEnd = true;
      }

    //hàng dọc
    if ((trow - i) >= 0)
      if (matrix[trow - i][tcol] == numberCheck && !topEnd) {
        countTop++;
      } else {
        topEnd = true;
      }
    if ((trow + i) < 20)
      if (matrix[trow + i][tcol] == numberCheck && !botEnd) {
        countBot++;
      } else {
        botEnd = true;
      }
    //chéo trên trái xuống phải topleft+botright
    if ((trow - i) >= 0 && (tcol - i) >= 0)
      if (matrix[trow - i][tcol - i] == numberCheck && !topLeftEnd) {
        countTopLeft++;
      } else {
        topLeftEnd = true;
      }
    if ((trow + i) < 20 && (tcol + i) < 20)
      if (matrix[trow + i][tcol + i] == numberCheck && !botRightEnd) {
        countBotRight++;
      } else {
        botRightEnd = true;
      }


    //chéo trên phải xuống trái topRight+botLeft
    if ((trow - i) >= 0 && (tcol + i) < 20)
      if (matrix[trow - i][tcol + i] == numberCheck && !topRightEnd) {
        countTopRight++;
      } else {
        topRightEnd = true;
      }
    if ((trow + i) < 20 && (tcol - i) >= 0)
      if (matrix[trow + i][tcol - i] == numberCheck && !botLeftEnd) {
        countBotLeft++;
      } else {
        botLeftEnd = true;
      }
  }
  if ((countLeft + countRight) >= 4) {
    console.log(k + " win!");
    return (k + " Win :)");
  }
  if ((countTop + countBot) >= 4) {
    console.log(k + " win!");
    return (k + " Win :)");
  }
  if ((countTopLeft + countBotRight) >= 4) {
    console.log(k + " win!");
    return (k + " Win :)");
  }
  if ((countTopRight + countBotLeft) >= 4) {
    console.log(k + " win!");
    return (k + " Win :)");
  }
}


// app.post('/signin', jsonParser, (req, res) => {
//   var un = req.body.fullname;
//   var ps = req.body.password;
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "caro"
//   });

//   con.connect(function (err) {
//     if (err) throw err;
//     con.query("SELECT * FROM user ", function (err, result, fields) {
//       if (err) { throw err; }
//       console.log(result);
//       for(var i = 0; i < result.length; i++){
//         if(result[i]["name"] == un && result[i]["password"] == ps){

//           res.send('success1');
//           console.log('ok');
//           return con;
//         }
//       }
//       res.send('Failure');
//     });
//   });
// });