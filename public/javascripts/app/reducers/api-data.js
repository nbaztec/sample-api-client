/**
 * Created by nisheeth on 25/7/16.
 */

import update from 'react-addons-update';
import {
  USER_SIGN_OUT,
  API_RESPONSE_VERSION,
} from '../actions/types';

export default (state = {
  version: null
}, action) => {

  switch (action.type) {
    case API_RESPONSE_VERSION:
      return update(state, {
        version: {$set: action.payload}
      });

    case USER_SIGN_OUT:
      return update(state, {
        version: {$set: null}
      });
  }

  return state;
}