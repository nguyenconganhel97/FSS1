import React from 'react';


class Menu extends React.Component {
    constructor(props){
        super(props);
        this.returnRoom = this.returnRoom.bind(this);
    }
    returnRoom(){
        this.props.homeRoom();
    }
    render() {
        return (
            <div>
                <ul>
                    <li class="active">Home</li>
                    <li onClick = {this.returnRoom}>Room</li>
                    <li>Profile</li>
                </ul>
            </div>
        );
    }
}
module.exports = Menu;