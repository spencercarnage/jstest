'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class User extends React.Component {
  componentDidMount () {
  }

  render() {
    return (
      <h1>{this.props.username}</h1>
    );
  }
}

User.propTypes = {
  username: PropTypes.string.isRequired
};

function mapStateToProps (state) {
  return {
    username: state.user.username
  }
}

export default connect(mapStateToProps)(User);
