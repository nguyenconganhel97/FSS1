import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import SignIn from 'SignIn';
import About from 'About';
import RoomList from 'RoomList';
class AccountInfo  extends React.Component {
  // logOUT(e){
  //   e.preventDefault();
  //   var {dispatch} = this.props;
  //   dispatch({type: 'LOG_OUT'});
  // }
    render() {
      var {roomin }= this.props;
      
      var xhtml = roomin === null? <RoomList/> : <About/>
      return (
        // <div> 
        //  <h1> this is account </h1>
        //   <p> username: {this.props.username}</p>
        //   <a href="#" onClick ={this.logOUT.bind(this)}> Log Out </a>
        // </div>
        <div>
        {xhtml}
        </div>
      );
    }
  }
  module.exports = connect(function(state){
    return { roomin : state.roomin , username: state.username };
  })
    (AccountInfo);