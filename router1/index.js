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
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "caro"
});
con.connect();
var listIdSocket = [];
var listRoom = [];
var listUserIdRoom = [];
//chua danh sach object socket va name cua socket
var listUserOnline = new Array();
//danh name sach cac nguoi trong 1 room
var listUserInRoom = new Array();

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

app.get('/', (req, res) => res.render('home'));


io.on('connection', function (socket) {
  console.log('a user connected : ' + socket.id);
  listIdSocket.push(socket.id);
  // socket.userName = socketUsername;
  socket.on("server-send-login", function (data) {
    un = data.username;
    ps = data.password;
    console.log("userrrrr : " + data.username);

    con.query('SELECT * FROM user', function (err, result) {
      if (err) {
        console.log("Erro");
        // res.render("/userLog/log.ejs");
      }
      else {
        console.log(result);
        // var array = result.rows;
        console.log("**********");
        var array = [];
        array = result;
        for (var i = 0; i < result.length; i++) {
          if (result[i]["name"] == un && result[i]["password"] == ps) {
            socket.userName = un;
            var object = {
              id: socket.id,
              name: socket.userName
            }
            listUserOnline.push(object);
            console.log('okkkkkkkkk');
            socket.emit("server-send-login-sucess", "True");
          }
          else {
            // socket.emit("server-send-login-sucess", "Fail");
          }

        }
      }
    });

  });
  socket.on("client-send-hello", function (data) {
    console.log("Client said : " + data);
  });
  socket.on("client-send-name-room", function (data) {
    // console.log("Nam room : " + data);
    // listUserIdRoom.push(socket.Username);

    //Tham gia vao 1 phong cua socket co trc
    socket.join(data);
    socket.nameRoom = data;
    //gui lai ten phong hien tai cua socket
    socket.emit("server-send-name-room", socket.nameRoom);
    //lay ra tat ca cac phong dang co trong socket    
    for (var x in io.sockets.adapter.rooms) {
      // console.log(x);
      // console.log(io.sockets.clients(x));
    }
    var u = io.sockets.adapter.rooms[data].sockets;
    console.log("List User in room " + socket.nameRoom);
    console.log(typeof u);
    console.log(u);
    listUserIdRoom = [];
    for (a in u) {
      console.log(a);
      listUserIdRoom.push(a);
    }
    console.log("00000000000");
    console.log(listUserOnline);
    console.log(listUserIdRoom);
    console.log(111111);
    listUserInRoom = [];
    for (var x = 0; x < listUserOnline.length; x++) {
      // console.log(listUserOnline[x]["id"]);
      for (var y = 0; y < listUserIdRoom.length; y++) {
        if (listUserIdRoom[y] == listUserOnline[x]["id"]) {
          listUserInRoom.push(listUserOnline[x]["name"]);
        }
      }


    }
    console.log("AAAAaa");
    console.log(listUserInRoom);
    io.sockets.in(socket.nameRoom).emit("server-send-user-in-room", listUserInRoom);

    //danh sach cac room dang co nguoi
    listRoom = [];
    for (var x in socket.adapter.rooms) {
      listRoom.push(x);
    }
    //tim ra room la socketid xong xoa no khoi danh sach room
    for (var i = 0; i < listIdSocket.length; i++) {
      var index = listRoom.indexOf(listIdSocket[i]);
      if (index > -1) {
        listRoom.splice(index, 1);
      }
    }
    console.log(listRoom);
    io.sockets.emit("server-send-list-room", listRoom);
  });
  socket.on("client-send-cell", function (data) {
    console.log(data);
    matrix[data.row][data.col] = data.value;
    // io.sockets.emit("server-send-cell", data);
    io.sockets.in(socket.nameRoom).emit("server-send-cell", data);
    var result = checkwin(data.value, data.row, data.col);
    if (result != undefined) {
      console.log("End game : " + result);
      io.sockets.in(socket.nameRoom).emit("server-send-result", result);
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
