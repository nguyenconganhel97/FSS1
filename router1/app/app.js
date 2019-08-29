import React from 'react';
import ReactDOM from 'react-dom';
var socket = io('http://localhost:8000');
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import About from 'About';
var Cell = require('Cell');
var TableGame = require("TableGame");
var RoomList = require('RoomList');





var HomePage = require('HomePage');
// var Cell = require('Cell');
ReactDOM.render(
  <div>
    <TableGame></TableGame>

  </div>
  ,
  document.getElementById('root')
);
