import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import About from 'About';
import TableGame from 'TableGame';
import TableGameController from 'TableGameController';
import Account from 'Account';
import history from 'history';
import SignIn from 'SignIn';
import { Provider } from 'react-redux';
var redux = require('redux');
var username = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.username;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
}

var reducer = redux.combineReducers({ username });
var store = redux.createStore(reducer);
//store.dispatch({type:'LOG_IN',username:'abc'});

class HomePage extends React.Component {

  render() {
    return (

      <div>

        <BrowserRouter history={history}>
          <div>
            <ul>

              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/tablegame">TableGame</Link>
              </li> <li>
                <Link to="/tablegamecontroller">tablegamecontroller</Link>
              </li>

              <li>
                <Link to="/topics" >Topics</Link>
              </li>
            </ul>

            <hr />
            <Provider store={store}>
              <div className="main-route-place">
                <Route exact path="/" component={Account} />
                <Route path="/about" component={About} />
                <Route path="/tablegame" component={TableGame} />
                <Route path="/tablegamecontroller" component={TableGameController} />
                <Route path="/topics" component={Topics} />
              </div>
            </Provider>
          </div>

        </BrowserRouter>

      </div>
    );
  }

}



class Topics extends React.Component {
  render() {
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${this.props.match.url}/rendering`}>
              Rendering with React
            </Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>

        <div className="secondary-route-place">
          <Route
            path={`${this.props.match.url}/:topicId`}
            component={Topic} />
          <Route
            exact
            path={this.props.match.url}
            render={() =>
              <h3>
                Please select a topic.
              </h3>
            }
          />
        </div>
      </div>
    );
  }
}

class Topic extends React.Component {
  render() {
    return (
      <div>
        <h3>
          {this.props.match.params.topicId}
        </h3>
      </div>
    );
  }
}
module.exports = HomePage;
