import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
var Cell = require('Cell');
var Team = require("./Team");




class TableGame extends React.Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this);
        this.state = {
            statePlayer: "Play"
        }

    }
    changeState() {
        this.state.statePlayer = "Play";
        this.setState(this.state);
    }
    render() {
        return (
            <div id = "main-room">
                <div id="room-left">
                    <div onClick={this.changeState}>
                        <button onClick={buildTable}>{this.state.statePlayer}</button>
                    </div>
                    <div id={this.props.match}>
                        <h3 id={this.props.turn}></h3>
                        <table>
                            <tbody id={this.props.tbmatch}></tbody>
                        </table>
                    </div>
                </div>
                <div id = "room-right">

                </div>
                
            </div>
        );
    }
}

function buildTable() {

    for (var i = 0; i < 20; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 20; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("class", "td-cell");
            cell.setAttribute("id", i.toString() + j.toString());
            cell.setAttribute("onClick", "change(this)");
            var cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        document.getElementById("tb-match").appendChild(row);
    }
    ReactDOM.render(
        <Team></Team>
        ,
        document.getElementById("room-right")

    );
    // ReactDOM.render(
    //     <div id = "main-game-left">
    //         <h3>Danh sach nguoi trong phon</h3>
    //     </div>,
    //     document.getElementById("main-game")
    // );
}

module.exports = TableGame;