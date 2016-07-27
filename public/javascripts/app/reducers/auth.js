/**
 * Created by nisheeth on 25/7/16.
 */

import update from 'react-addons-update';
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
  API_ERROR
} from '../actions/types';

export default (state = {valid: false, token: null, user: null}, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      sessionStorage.setItem('auth-token', JSON.stringify(action.payload));
      return update(state, {
        valid: {$set: true},
        token: {$set: action.payload.token},
        user: {$set: action.payload.user}
      });

    case USER_SIGN_OUT:
      sessionStorage.removeItem('auth-token');
      return update(state, {
        valid: {$set: false},
        token: {$set: null},
        user: {$set: null}
      });
    
    case API_ERROR:
      // Token invalid or expired
      if (action.payload.code === 400 && action.payload.message === 'Unauthorized request') {
        sessionStorage.removeItem('auth-token');
        return update(state, {
          valid: {$set: false},
          token: {$set: null},
          user: {$set: null}
        });
      }
  }

  return state;
}