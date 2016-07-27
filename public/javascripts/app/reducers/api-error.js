/**
 * Created by nisheeth on 25/7/16.
 */

import update from 'react-addons-update';
import {
  API_ERROR,
  API_ERROR_RESET
} from '../actions/types';

export default (state = {code: null, message: null, error: false}, action) => {

  switch (action.type) {
    case API_ERROR_RESET:
      return update(state, {
        code: {$set: null},
        message: {$set: null},
        error: {$set: false}
      });

    case API_ERROR:
      return update(state, {
        code: {$set: action.payload.code},
        message: {$set: action.payload.message},
        error: {$set: true}
      });
  }

  return state;
}