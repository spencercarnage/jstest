'use strict';

import React, { Component } from 'react';
import { createUser } from '../actionCreators/user'; 
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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

    // Something is broken here. Need read more about combining reducers.
    this.props.dispatch(createUser(user));
    this.props.dispatch(routeActions.push(`/user/${user.username}`));
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

export default connect(state => state)(CreateUser);
