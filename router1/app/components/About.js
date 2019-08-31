import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class About extends React.Component {
  render() {
    return (
      <div>
        <h2>Abouttttt</h2>
      </div>
    );
  }
}
module.exports = connect()(About);