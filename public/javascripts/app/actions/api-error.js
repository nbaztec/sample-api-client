/**
 * Created by nisheeth on 26/7/16.
 */

import {
  API_ERROR,
  API_ERROR_RESET
} from './types';

export function apiError(dispatch, response) {
  if (response instanceof Error) {
    dispatch({
      type: API_ERROR,
      payload: {
        code: 500,
        message: response.message
      }
    });
  } else {
    dispatch({
      type: API_ERROR,
      payload: {
        code: response.status,
        message: response.data.error
      }
    });
  }
}

export function apiErrorReset(dispatch) {
  dispatch({
    type: API_ERROR_RESET
  });
}