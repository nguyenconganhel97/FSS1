import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

    }
    login() {
        var username = document.getElementById("username").value;
        var pass = document.getElementById("password").value;
        this.props.myEvent(username, pass);
    }
    render() {
        return (
            <div>


                <div className="login-page">
                    <div className="form">
                        {/* <form className="register-form">
                            <input type="text" placeholder="name" />
                            <input type="password" placeholder="password" />
                            <input type="text" placeholder="email address" />
                            <button>create</button>
                            <p className="message">Already registered? <a href="#">Sign In</a></p>
                        </form> */}
                        <div className="login-form">
                            <input type="text" placeholder="username" id="username" />
                            <input type="password" placeholder="password" id="password" />
                            <button onClick={this.login}>Login</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
module.exports = Login;