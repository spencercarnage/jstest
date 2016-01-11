'use strict';

import socket from 'socket.io-client';
import React  from 'react';
import ReactDOM  from 'react-dom';
import Provider from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import App from './components/App';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import questionsReducer from './reducers/questions';

const reducer = combineReducers(Object.assign({}, {
  questionsReducer
}, {
  routing: routeReducer
}));

const store = createStore(reducer);
const history = createHistory();

syncReduxAndRouter(history, store);

var routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/question/:questionId" component={Question}/>
    </Router>
  </Provider>
)

ReactDOM.render(routes, document.querySelector('main'));
