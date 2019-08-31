var socket = io('http://localhost:8000');
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

socket.on("server-send-result", function (data) {
    alert(data);
    document.getElementById("tb-match").innerHTML = "";
    buildTable();


});

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
window.clickRoom = function clickRoom(id){
   alert("ID : " + id);
//    var {dispatch} = this.props;
//   dispatch({type: 'joinroom', roomin: '12'});
   
}
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


// buildTable();
// Hello();
function Hello() {
    alert("Hiiii");
}





module.exports = connect()(TableGameController);