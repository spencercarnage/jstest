'use strict';

import React from 'react';

export default class CreateUser extends React.Component {
  constructor() {
    super();

    this.state = {
    }
  }

  createUser () {
    const usernameNode = this.ref.username;

    const user = {
      username: usernameNode.value.username.trim(),
      profile_img: '',
      id: 0
    }

    usernameNode.disabled = true;
  }

  render () {
    return (
      <div>
        <input type="text" ref="username" />
        <button onClick={this.createUser}>Create</button>
      </div>
    );
  }
}
