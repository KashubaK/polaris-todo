import React, { Component } from 'react';

import './App.css';
import '@shopify/polaris/styles.css'

import Home from './containers/Home';
import Todo from './containers/Todo';
import { AppProvider } from '@shopify/polaris';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

var currentTodoId = 0;

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <div className="App">
            <Route exact path="/" component={props => <Home {...props} />} />
            <Route path="/:id" component={props => <Todo {...props} />} />
          </div>
        </Router>
      </AppProvider>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(App);