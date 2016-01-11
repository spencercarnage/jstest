'use strict';

import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');

socket.on('oh hi!', function () {
  console.log('hello');
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
    }
  }

  socketClick () {
    socket.emit('burp');
  }

  render() {
    return (
      <div>
        <button onClick={this.socketClick}>click</button>
      </div>
    );
  }
}

export default App;
