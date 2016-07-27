/**
 * Created by nisheeth on 25/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class SignOut extends Component {

  componentWillMount() {
    this.props.signOutUser();
  }

  render() {
    return <div className="main-container center"><h2>Signing out...</h2></div>
  }
}

export default connect(null, actions)(SignOut);