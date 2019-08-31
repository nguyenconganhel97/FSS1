var socket = io('http://localhost:8000');
import React from 'react';
import ReactDOM from 'react-dom';

import About from 'About';
import TableGame from 'TableGame';
import TableGameController from 'TableGameController';
import Account from 'Account';
import history from 'history';
import SignIn from 'SignIn';
import AccountInfo from 'AccountInfo';
import Cell from "Cell";
var Menu = require("./components/Menu.js");
var RoomList = require("./components/RoomList");

var HomePage = require('HomePage');
// var Cell = require('Cell');
ReactDOM.render(
  <div>
    {/* <Cell myEvent = {Hello}></Cell> */}
    {/* <TableGame match="match" turn="turn" tbmatch="tb-match"></TableGame> */}
    <Menu homeRoom={HomeRoom}></Menu>
    {/* <Cell myEvent = {Hello}></Cell> */}
  </div>
  ,
  document.getElementById('main-menu')
);
function HomeRoom() {
  ReactDOM.render(
    <div>
      <RoomList ></RoomList>
    </div>,
    document.getElementById("main-game")
  );
}
function Hello() {
  alert("Hihii");
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
window.clickRoom = function clickRoom(id) {
  alert("ID : " + id);
  ReactDOM.render(
    <div id="main-game-center">
      <TableGame match="match" turn="turn" tbmatch="tb-match"></TableGame>
    </div>,
    document.getElementById("main-game")
  );
}
$(document).ready(function () {
  ReactDOM.render(
    <div>
      <RoomList ></RoomList>
    </div>,
    document.getElementById("main-game")
  );

});

