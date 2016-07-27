/**
 * Created by nisheeth on 26/7/16.
 */

import { expect, spy } from '../helper';
import authReducer from '../../public/javascripts/app/reducers/auth';
import {
  API_ERROR,
  USER_SIGN_IN,
  USER_SIGN_OUT
} from '../../public/javascripts/app/actions/types';


describe('Auth Reducer', () => {

  beforeEach(() => {
    global.sessionStorage = {
      removeItem: spy((key) => {
      }),

      setItem: spy((key, value) => {
      })
    };
  });

  it('handles undefined action', () => {
    expect(authReducer({foo: 'bar'}, {type:undefined})).to.eqls({foo: 'bar'})
  });

  it('handles USER_SIGN_IN action', () => {
    expect(authReducer(undefined, {type:USER_SIGN_IN, payload: {user: 'joe', token: '123456'}}))
      .to.eqls({valid: true, user: 'joe', token: '123456'});

    expect(global.sessionStorage.setItem).to.have.been.called.once.with.exactly('auth-token', '{"user":"joe","token":"123456"}')
  });

  it('handles USER_SIGN_OUT action', () => {
    expect(authReducer(undefined, {type:USER_SIGN_OUT}))
      .to.eqls({valid: false, user: null, token: null});

    expect(global.sessionStorage.removeItem).to.have.been.called.once.with.exactly('auth-token')
  });

  it('handles API_ERROR 400 Unauthorized', () => {
    expect(authReducer(undefined, {type:API_ERROR, payload: { code: 400, message: 'Unauthorized request'}}))
      .to.eqls({valid: false, user: null, token: null});

    expect(global.sessionStorage.removeItem).to.have.been.called.once.with.exactly('auth-token')
  });

  it('ignores API_ERROR non 400 Unauthorized actions', () => {
    expect(authReducer({valid: true, user: 'joe', token: '123456'}, {type:API_ERROR, payload: { code: 404, message: 'Not Found' }}))
      .to.eqls({valid: true, user: 'joe', token: '123456'});

    expect(global.sessionStorage.removeItem).to.not.have.been.called();
  });
});