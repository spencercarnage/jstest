'use strict';

import React from 'react';
import io from 'socket.io-client';
import { pushPath } from 'redux-simple-router';
import store from '../store';

const socket = io('http://localhost:4040');

socket.on('oh hi!', function () {
  console.log('hello');
});

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
    }
  }

  createUser () {
    store.dispatch(pushPath('/create-user'));
    //socket.emit('burp');
  }

  render() {
    return (
      <div>
        <button onClick={this.createUser}>Create a user</button>
      </div>
    );
  }
}
