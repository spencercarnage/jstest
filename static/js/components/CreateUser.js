'use strict';

import React, { Component } from 'react';
import store from '../store';
import { createUser } from '../actionTypes/user'; 

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    //this.createUser = this.createUser.bind(this);
  }

  createUser() {
    const usernameNode = this.refs.username;

    const user = {
      username: usernameNode.value.trim(),
      profile_img: '',
      id: 0
    };

    // Disable form inputs
    this.refs.create.setAttribute('disabled', true);
    usernameNode.setAttribute('disabled', true);
    store.dispatch(createUser(user));
    store.dispatch(pushPath('/user'));
  }

  render () {
    return (
      <div>
        <input type="text" ref="username" />
        <button ref="create" onClick={this.createUser.bind(this)}>Create</button>
      </div>
    );
  }
}

export default CreateUser;
