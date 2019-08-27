import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import SignIn from 'SignIn';


class AccountInfo  extends React.Component {
  logOUT(e){
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch({type: 'LOG_OUT'});
  }
    render() {
      var {username }= this.props;
      
      var xhtml = username === null? <SignIn/> : <AccountInfo/>
      return (
        <div> 
         <h1> this is account </h1>
          <p> username: {this.props.username}</p>
          <a href="#" onClick ={this.logOUT.bind(this)}> Log Out </a>
        </div>
      );
    }
  }
  module.exports = connect(function(state){
    return {username: state.username };
  })
    (AccountInfo);