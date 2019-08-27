import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Cell extends React.Component {
    render() {
        return (
            <div>
                <h2>Cell</h2>
            </div>
        );
    }
}
module.exports = Cell;