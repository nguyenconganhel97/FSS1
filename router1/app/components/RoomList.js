import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

var a = 16;
var listRoom = [];
for(var i = 0 ; i < a; i++){
    listRoom.push(i);
}
const style = {
    room_container:{
        // border: '3px solid black',
        width: '1000px',
        height: '600px',
        float: 'left',
        marginleft: '5px'
    },
    pstyle:{
        textAlign: 'center'
    },
    room_style:{
        display: 'inline-block',
        position: 'relative',
        float: 'left',
        margin: '10px',
        border: '3px solid #73AD21',
        width: '200px',
        height: '100px',
        borderRadius: '25px',
    },
    room_name:{
        float: 'left',
        display: 'flex',
        marginLeft: '2px'
    },
    player_name:{
        float: 'right',
        display: 'flex',
        marginRight: '2px'
    }
}

// class OnlineList extends React.Component{
//     render(){
//         return(
//             <div style = {style.divstyle}>
//                 <p style= {style.pstyle}>Player online list</p>
//             </div>
//         );
//     }
// }

class RoomList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // hidden: false,
            list  : listRoom
        }
    };

    render(){
        // if(this.state.hidden)
        //     return null;
        // else
            return(
                // <div style = {style.room_container}>
                //     <Room room_id = '1'/>
                //     <Room room_id = '2'/>
                // </div>
               <div style = {style.room_container}>
                   {
                       this.state.list.map(function(value,index){
                         return(
                             <Room room_id = {index} click = {clickRoom}></Room>
                         );
                       })
                   }
               </div>
            )
    }
}

class Room extends React.Component{
    constructor(props){
        super(props);
        
       
        this.onDivClicked = this.onDivClicked.bind(this);
        this.state = {
            player1: "abc",
            player2: ""
        }
    }
    onDivClicked(){
        
       this.props.click(this.props.room_id);
    //    var {dispatch} = this.props;
       add();
//    store1.dispatch({type: 'joinroom' , roomin: '123'});
       
//        console.log(this.state.roomin);
      
    }
 
    render(){
        return(
           
            <div style = {style.room_style} onClick = {this.onDivClicked} >
                <br></br>
                <div style = {style.room_name}>Room {this.props.room_id}</div>
                <div style = {style.player_name}>{this.state.player1}</div>
                <div style = {style.player_name}>{this.state.player2}</div>
            </div>
           
        )
    }
}
// module.exports =connect(function(state){
//     return{username : state.username , roomin: state.roomin}
// }) (RoomList);
module.exports = (RoomList);