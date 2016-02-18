'use strict';

import React from 'react';
import io from 'socket.io-client';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';

const socket = io('http://localhost:4040');

socket.on('oh hi!', function () {
  console.log('hello');
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  createUser () {
    this.props.dispatch(routeActions.push('/create-user'));
    //socket.emit('burp');
  }

  render() {
    return (
      <div>
        <button onClick={this.createUser.bind(this)}>Create a user</button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    foo: 'foo'
  }
}

export default connect(mapStateToProps)(App);
