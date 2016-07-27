/**
 * Created by nisheeth on 25/7/16.
 */

import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions/auth';

class SignIn extends Component {

  handleFormSubmit({username, password}) {
    this.props.signInUser(username, password);
  }

  renderErrors() {
    if (this.props.apiError.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.apiError.message}
        </div>
      )
    }
  }

  render() {
    const {handleSubmit, fields: {username, password}} = this.props;

    return (
      <div className="main-container" style={{paddingLeft:'150px'}}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} style={{width:'50%'}}>
          <fieldset className="form-group">
            <label>Username:</label>
            <input {...username} className="form-control" />
            {username.touched && username.error && <div className="text-danger small">{username.error}</div>}
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <input {...password} type="password" className="form-control" />
            {password.touched && password.error && <div className="text-danger small">{password.error}</div>}
          </fieldset>
          {this.renderErrors()}
          <button action="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'auth-sign-in',
  fields: ['username', 'password'],
  validate: values => {

    const errors = {};

    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less'
    }

    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or more'
    }
    
    return errors;
  }
}, state => {
  return {
    auth: state.auth,
    apiError: state.apiError
  }
}, actions)(SignIn);