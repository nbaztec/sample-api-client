/**
 * Created by nisheeth on 25/7/16.
 */

import { axios } from '../services/axios';
import { browserHistory } from 'react-router';
import { apiUrl } from '../config';
import { apiError, apiErrorReset } from './api-error';
import {
  USER_SIGN_IN,
  USER_SIGN_OUT,
} from './types';

export function signInUser(username, password) {
  return dispatch => {

    apiErrorReset(dispatch);

    axios.post(apiUrl('/auth/token'), {
      username,
      password
    })
      .then(response => {
        switch (response.status) {
          case 200:
            dispatch({
              type: USER_SIGN_IN,
              payload: {
                token: response.data.token,
                user: response.data.user
              }
            });

            browserHistory.push('/');
            break;

          default:
            apiError(dispatch, response);
            break;
        }

      })
      .catch(error => {
        apiError(dispatch, error);
      });
  }
}

export function signOutUser() {
  return {
    type: USER_SIGN_OUT
  };
}