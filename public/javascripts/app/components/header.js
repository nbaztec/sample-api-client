/**
 * Created by nisheeth on 19/7/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

class Header extends Component {

  renderView() {
    if (this.props.auth.valid) {
      return (
        <li><Link to="/signout">Sign Out</Link></li>
      )
    } else {
      return (
        <li><Link to="/signin">Sign In</Link></li>
      )
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">Project name</Link>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {this.renderView()}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a>{this.props.auth.user && this.props.auth.user}</a></li>
              </ul>
            </div>


          </div>

        </nav>
      </div>
    )
  }
}

export default connect(state => {
  return {
    auth: state.auth
  }
})(Header);