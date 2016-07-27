/**
 * Created by nisheeth on 26/7/16.
 */

import moxios from 'moxios';
import { expect, spy } from '../helper';
import { signInUser, signOutUser } from '../../public/javascripts/app/actions/auth';
import { axios } from '../../public/javascripts/app/services/axios';
import { browserHistory } from 'react-router';
import {
  API_ERROR_RESET,
  API_ERROR,
  USER_SIGN_IN,
  USER_SIGN_OUT
} from '../../public/javascripts/app/actions/types';


describe('Auth Actions', () => {

  global.sessionStorage = {
    removeItem: (key) => {},
    setItem: (key, value) => {}
  };

  const browserHistoryMethodPush = browserHistory.push;

  before(() => {
    browserHistory.push = spy((path) => {
      console.log('path', path);
    });
  });

  after(() => {
    browserHistory.push = browserHistoryMethodPush;
  });

  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe('signInUser', () => {
    it('dispatches successful action', (done) => {

      const expectedActions = [
        { type: API_ERROR_RESET },
        { type: USER_SIGN_IN, payload: {token: '123456', user: 'joe'} }
      ];

      moxios.stubRequest('http://localhost:9001/auth/token', {
        status: 200,
        responseText: {token: '123456', user: 'joe'}
      });

      signInUser()(action => {
        try {
          expect(action).to.eqls(expectedActions.shift());
          if (!expectedActions.length) {
            done();
          }
        } catch (err) {
          done(err);
        }
      });
    });

    it('dispatches error', (done) => {

      const expectedActions = [
        { type: API_ERROR_RESET },
        { type: API_ERROR, payload: { code: 400, message: 'Authorization failed'} }
      ];

      moxios.stubRequest('http://localhost:9001/auth/token', {
        status: 400,
        responseText: {error: 'Authorization failed'}
      });

      signInUser()(action => {
        try {
          expect(action).to.eqls(expectedActions.shift());
          if (!expectedActions.length) {
            done();
          }
        } catch (err) {
          done(err);
        }
      });
    });

    after('successful dispatch causes browser redirect', () => {
      console.log('checking..');
      expect(browserHistory.push).to.have.been.called.once.with.exactly('/');
    });
  });

  describe('signOutUser', () => {
    it('dispatches valid action', () => {
      expect(signOutUser()).to.eqls({type: USER_SIGN_OUT});
    });
  });
});