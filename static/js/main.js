'use strict';

import socket from 'socket.io-client';
import React  from 'react';
import ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';

import store from './store';

// Components
import App from './components/App';
import User from './components/User';
import CreateUser from './components/CreateUser';
import Question from './components/Question';

const history = createHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/question/:questionId" component={Question} />
      <Route path="/create-user" component={CreateUser} />
      <Route path="/user" component={User} />
    </Router>
  </Provider>,
  document.querySelector('main')
);
