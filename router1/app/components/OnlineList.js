import React from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';

// EmployeeList Component
const style = {
    playerList :{
        width:'300px',
        height: '600px',
        float: 'right',
        margin: '10px',
        border: '3px solid black'
    },
    p_onlineList:{
        textAlign: 'center'
    }

}
class OnlineList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [
                { fullName: "Hoang Nguyen" },
            ]
        };
    }

    render() {
        // Array of <PlayerOnl>
        var listPlayer = this.state.user.map(p => (
            <PlayerOnline fullName={p.fullName} />
        ));
        return (
            <div style = {style.playerList}>
                <p style = {style.p_onlineList}>Online List</p>
                <hr></hr>
                <ul className="player-onllist">
                    {listPlayer}
                </ul>
            </div>
        );
    }
}
class PlayerOnline extends React.Component {
    render() {
      return (
        <li className="playeronl">
          <div>
            <b>Full Name:</b> {this.props.fullName}
          </div>
        </li>
      );
    }
  }
// ReactDOM.render(
//     <PlayerOnlList/>,
//     document.getElementById('root')
// );

module.exports = OnlineList;