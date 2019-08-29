import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from 'SignIn';
import AccountInfo from 'AccountInfo';
import RoomList from 'RoomList';
import TableGameController from "TableGameController";
import OnlineList from "OnlineList";

class Account extends React.Component {
  render() {
    var { username } = this.props;

    var xhtml = username === null ? <SignIn /> : <div> <TableGameController /> <OnlineList />  </div>
    return (
      <div>
        {xhtml}
      </div>
    );
  }
}
module.exports = connect(function (state) {
  return { username: state.username, roomin: state.roomin };
})
  (Account);