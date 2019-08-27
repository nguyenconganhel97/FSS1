import React from 'react';
import ReactDOM from 'react-dom';

var HomePage = require('HomePage');
var Cell = require('Cell');
ReactDOM.render(
  <div>
    <HomePage />,
    <Cell></Cell>
  </div>
  ,
  document.getElementById('root')
);
