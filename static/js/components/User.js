'use strict';

import React, { Component, PropTypes } from 'react';

export default class User extends React.Component {
  render() {
    return (
      <h1>{this.props.user.username}</h1>
    );
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired
};
