import {connect} from 'react-redux';
import React from 'react';
import axios from 'axios';



class SignIn extends React.Component{
    
    constructor(props) {
        super(props);
       
        this.state = {
          fullName: "",
          password:""
        };
      }
     
      
      handleSubmitForm(event) {
          event.preventDefault();
          var {dispatch} = this.props;
          axios.post('/signin', {
              fullname: this.state.fullName,
              password: this.state.password
            })
            .then(res=> {
                if(res.data === 'success1'){
                //  return (<Reirect to={conponent = {About}}/>);
                dispatch({type:'LOG_IN',username: this.state.fullName});
               
               
                }
                else {
                    alert("vui long nhap lai");
                }
            })
            .catch(function (error) {
              console.log(error);
            });
       
      }
      handleChangePassword(event) {
          var value = event.target.value;
       
          this.setState({
            password: value
          });
        }
      handleChangeFullname(event) {
        var value = event.target.value;
     
        this.setState({
          fullName: value
        });
      }
     
      render() {
        return (
          <form onSubmit={event =>this.handleSubmitForm(event)}>
            <label>
              Full Name:
              <input
                type="text"
                value={this.state.fullName}
                onChange={event => this.handleChangeFullname(event)}
              />
            </label>
            <br></br>
            <label>
             Password:
              <input
                type="text"
                value={this.state.password}
                onChange={event => this.handleChangePassword(event)}
              />
            </label>
            <br></br>
            <input type="submit" value="Submit" />
           
          </form>
        );
      }
    }
     
module.exports = connect()(SignIn);