import React from 'react';
class BoxChat extends React.Component {
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
                <button onClick={this.myEventActive}>Send</button>
            </div>
        );
    }
}
module.exports = BoxChat;