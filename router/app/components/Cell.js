import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.myEventActive = this.myEventActive.bind(this);
    }
    myEventActive() {
        this.props.myEvent();
    }
    render() {
        return (
            <div>
                <h2>Cell</h2>
                <button onClick={this.myEventActive}>EventCell</button>
            </div>
        );
    }
}
module.exports = Cell;