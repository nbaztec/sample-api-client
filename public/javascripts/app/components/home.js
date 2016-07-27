/**
 * Created by nisheeth on 25/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/api';

class Home extends Component {

  onFetchVersionClick() {
    this.props.fetchVersion();
  }

  renderVersion() {
    if (this.props.apiDataVersion) {
      return (
        <div className="col-lg-8">
          <div className="alert alert-info">Version {this.props.apiDataVersion}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1>Welcome!</h1>
        <h3>Simple API Client</h3>
        <br />
        <div className="row-fluid">
          <button className="btn btn-primary btn-lg col-lg-2" onClick={this.onFetchVersionClick.bind(this)}>Fetch Version</button>
          {this.renderVersion()}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    apiDataVersion: state.apiData.version
  };
}, actions)(Home);