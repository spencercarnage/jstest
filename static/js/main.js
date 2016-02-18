'use strict';

import socket from 'socket.io-client';

import React  from 'react';
import ReactDOM  from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

// Reducers
import questionsReducer from './reducers/questions';
import userReducer from './reducers/user';
import userAnswersReducer from './reducers/userAnswers';
import storageMiddleware from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk';

import { syncHistory, routeReducer } from 'react-router-redux';

const reducers = {
  questionsReducer,
  user: userReducer,
  userAnswersReducer,
  routing: routeReducer
}

const reducer = combineReducers(Object.assign({}, reducers));

const reduxRouterMiddleware = syncHistory(browserHistory);

const createStoreWithMiddleware = applyMiddleware(
  storageMiddleware,
  reduxRouterMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

// Components
import App from './components/App';
import User from './components/User';
import CreateUser from './components/CreateUser';
import Question from './components/Question';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/question/:questionId" component={Question} />
      <Route path="/create-user" component={CreateUser} />
      <Route path="/user/:username" component={User} />
    </Router>
  </Provider>,
  document.querySelector('main')
);
