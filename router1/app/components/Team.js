import React from 'react';
;
class Team extends React.Component {
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
                <div id="room-right-x">
                    <h3>Team X</h3>
                    <h2>2</h2>
                </div>
                <div id="room-right-o">
                    <h3>Team O</h3>
                    <h2>2</h2>
                </div>
            </div>
        );
    }
}
module.exports = Team;