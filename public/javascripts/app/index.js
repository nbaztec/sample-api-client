/**
 * Created by nisheeth on 19/7/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/app';
import Home from './components/home';
import SignIn from './components/auth/sign-in';
import SignOut from './components/auth/sign-out';
import RequireAuth from './components/auth/require-auth';
import {
  USER_SIGN_IN
} from './actions/types';

const store = applyMiddleware(reduxThunk)(createStore)(reducers);

try {
  const authToken = JSON.parse(sessionStorage.getItem('auth-token'));
  console.log(authToken);

  if (authToken) {
    store.dispatch({
      type: USER_SIGN_IN,
      payload: authToken
    })
  }
} catch (e) {}


ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={RequireAuth(Home)} />
        <Router path="signin" component={SignIn} />
        <Router path="signout" component={RequireAuth(SignOut)} />
      </Route>
    </Router>
  </Provider>
), document.querySelector('#application'));