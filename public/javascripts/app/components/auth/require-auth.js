/**
 * Created by nisheeth on 26/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class RequireAuth extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.auth.valid) {
        this.context.router.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.valid) {
        this.context.router.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return connect(state => {
    return {
      auth: state.auth
    };
  })(RequireAuth);
}