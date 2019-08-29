var socket = io('http://localhost:8000');
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import About from 'About';
var Cell = require('Cell');
var TableGame = require("TableGame");
var RoomList = require('RoomList');


window.Hello = function Hello(id) {
    alert("HIHI" + id);
    socket.emit("client-send-active", "Helooo");
}
socket.on("server-send-active", function (data) {
    alert("OK");
    ReactDOM.render(
        <div>
            <TableGame></TableGame>
        </div>
        ,
        document.getElementById('root')
    );
});
ReactDOM.render(
    <div>
        <RoomList clickRoomEvent={Hello}></RoomList>

    </div>
    ,
    document.getElementById('root')
);






