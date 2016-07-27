/**
 * Created by nisheeth on 26/7/16.
 */

import { axiosApi } from '../services/axios';
import { apiUrl } from '../config';
import { apiError, apiErrorReset } from './api-error';
import { API_RESPONSE_VERSION } from './types';

export function fetchVersion() {
  return dispatch => {
    apiErrorReset(dispatch);
    axiosApi().get(apiUrl('/api'))
      .then(response => {
        switch (response.status) {
          case 200:
            dispatch({
              type: API_RESPONSE_VERSION,
              payload: response.data.version
            });
            break;

          default:
            apiError(dispatch, response);
            break;
        }
      })
      .catch(error => {
        apiError(dispatch, error);
      });
  };
}