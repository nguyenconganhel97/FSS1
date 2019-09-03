var socket = io('http://localhost:8000');
import React from 'react';
import ReactDOM from 'react-dom';

import About from 'About';
import TableGame from 'TableGame';
// import TableGameController from 'TableGameController';
import Account from 'Account';
import history from 'history';
import SignIn from 'SignIn';
import AccountInfo from 'AccountInfo';
import Cell from "Cell";
var Menu = require("./components/Menu.js");
var RoomList = require("./components/RoomList");
var Viewer = require("./components/Viewer");
var Login = require("./components/Login");

var HomePage = require('HomePage');
// var Cell = require('Cell');

var play = false;
var count = 0;
var matrix = [];
for (var i = 0; i < 20; i++) {
  var row = [];
  for (var j = 0; j < 20; j++) {
    row.push(0);
  }
  matrix.push(row);
}
var countTurn = 0;
var flag = true;
var XO;


//render ra menu
// ReactDOM.render(
//   <div>
//     {/* <Cell myEvent = {Hello}></Cell> */}
//     {/* <TableGame match="match" turn="turn" tbmatch="tb-match"></TableGame> */}
//     <Menu homeRoom={HomeRoom}></Menu>
//     {/* <Cell myEvent = {Hello}></Cell> */}
//   </div>
//   ,
//   document.getElementById('main-menu')
// );

//Trang home sau khi dang nhap xong se hien ra
function HomeRoom() {
  ReactDOM.render(
    <div>
      <Menu homeRoom={HomeRoom}></Menu>
      <RoomList ></RoomList>
    </div>,
    document.getElementById("main-game")
  );
}
//function test
function Hello() {
  alert("Hihii");;
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
//ket qua login duoc server gui ve
socket.on("server-send-login-sucess", function (data) {

  if (data == "True") {
    alert("Login Success!");
    document.getElementById("main").style.display = 'block';
    ReactDOM.unmountComponentAtNode(document.getElementById('login'));
    HomeRoom();

  }
  else {
    alert("Login Fail");
    <Login myEvent={checkLogin}></Login>
  }
});
//server send ve danh sach cac user trong room
socket.on("server-send-user-in-room", function (data) {
  // document.getElementById("user-in-room").innerHTML = "";
  ReactDOM.render(
    <div>
      <div>
        {data.map((value, index) => {
          return <p key={index}>{value}</p>
        })}
      </div>
    </div >,
    document.getElementById("user-in-room")
  );



});
//server send lai ket qua danh cua van co
socket.on("server-send-result", function (data) {
  alert(data);
  document.getElementById("main-game").innerHTML = "";
  ReactDOM.render(
    <div>
      <Menu homeRoom={HomeRoom}></Menu>
      <div id="main-game-left">
        <h3>Danh sách người trong phòng</h3>
        <div id="user-in-room">
        </div>
      </div>
      <div id="main-game-center">
        <TableGame match="match" turn="turn" tbmatch="tb-match"></TableGame>
      </div>
    </div>,
    document.getElementById("main-game")
  );

});
//server send ban co xuong client
socket.on("server-send-cell", function (data) {
  var i = data.row;
  var j = data.col;
  var w = i.toString() + j.toString();
  var cell;
  count = data.countPlay;
  if (data.value == 1) {
    cell = "X";
    document.getElementById("turn").innerHTML = "Đến lượt O";

  }
  else {
    cell = "O";
    document.getElementById("turn").innerHTML = "Đến lượt X";
  }
  if (XO == cell) {
    flag = false;
  }
  else {
    flag = data.go;
  }
  matrix[i][j] = data.value;
  document.getElementById(w).innerHTML = cell;
});
//ham xu ly danh co
window.change = function change(myobj) {
  var excep = false;
  if (flag == true) {
    var value = myobj.innerHTML;
    if (value == "") {
      var t = (value === "" && count % 2 == 0) ? "X" : "O";
      XO = t;
      // document.getElementById("turn").innerHTML="Lượt "+((t == "X")? "O":"X" );
      // myobj.innerHTML = t;
      //alert("you clicked: cell "+myobj.cellIndex+", row:"+myobj.parentElement.rowIndex);
      count++;
      var trow = myobj.parentElement.rowIndex;
      var tcol = myobj.cellIndex;
      var number = (t == "X") ? 1 : 2;
      var objectCell = {
        row: trow,
        col: tcol,
        value: number,
        countPlay: count,
        go: true
      }
      socket.emit("client-send-cell", objectCell);
      // matrix[trow][tcol]= number;
    }
    else {
      alert("Bạn không được đánh vào ô này!");
      excep = true;
    }

  }
  else {
    alert("Đến lượt đối thủ");
  }
  flag = false;
  if (excep == true) {
    flag = true;
  }


}
//ham xu ly khi click vao 1 room nao do
window.clickRoom = function clickRoom(idRoom) {
  alert("ID : " + idRoom);

  socket.emit("client-send-name-room", idRoom);
  ReactDOM.render(
    <div>
      <Menu homeRoom={HomeRoom}></Menu>
      <div id="main-game-left">
        <h3>Danh sách người trong phòng</h3>
        <div id="user-in-room">

        </div>
      </div>
      <div id="main-game-center">
        <TableGame match="match" turn="turn" tbmatch="tb-match"></TableGame>
      </div>
    </div>,
    document.getElementById("main-game")
  );

}
//ham xu ly khi nhan vao login va gui len server
function checkLogin(username, password) {
  socket.emit("server-send-login", { username: username, password: password });
}
$(document).ready(function () {
  document.getElementById("main").style.display = 'none';
  ReactDOM.render(
    <div>
      {/* <RoomList ></RoomList> */}
      <Login myEvent={checkLogin}></Login>
    </div>,
    document.getElementById("login")
  );

});

