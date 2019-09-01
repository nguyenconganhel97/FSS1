// var socket = io('http://localhost:8000');
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
var Cell = require('Cell');
var TableGame = require("TableGame");
var RoomList = require('RoomList');
import {store1} from 'HomePage'
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

class TableGameController extends React.Component {
    constructor(props) {
        super(props);

    } 
//   window.clickRoom = function clickRoom(id){

//     window.alert("id" + id);
//    }
    render() {
        return (
            <div>
                <h3>Hellooo</h3>
                <Cell myEvent={Hello}></Cell>
                {/* <TableGame match="match" turn="turn" tbmatch="tb-match"></TableGame> */}
                <RoomList></RoomList>
            </div>
        );
    }
}

// socket.on("server-send-result", function (data) {
//     alert(data);
//     document.getElementById("tb-match").innerHTML = "";
//     buildTable();


// });

// socket.on("server-send-cell", function (data) {
//     var i = data.row;
//     var j = data.col;
//     var w = i.toString() + j.toString();
//     var cell;
//     count = data.countPlay;
//     if (data.value == 1) {
//         cell = "X";
//         document.getElementById("turn").innerHTML = "Đến lượt O";

//     }
//     else {
//         cell = "O";
//         document.getElementById("turn").innerHTML = "Đến lượt X";
//     }
//     if (XO == cell) {
//         flag = false;
//     }
//     else {
//         flag = data.go;
//     }
//     matrix[i][j] = data.value;
//     document.getElementById(w).innerHTML = cell;
// });




// buildTable();
// Hello();
function Hello() {
    alert("Hiiii");
}





module.exports = connect()(TableGameController);