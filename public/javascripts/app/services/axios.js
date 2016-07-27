/**
 * Created by nisheeth on 25/7/16.
 */

import axiosBase from 'axios';

export const axios = axiosBase.create({
  validateStatus: status => {
    return status >= 200 && status < 500;
  }
});

const axiosAuthHeader = axiosBase.create({
  headers: {
    'Authorization': null
  },
  validateStatus: status => {
    return status >= 200 && status < 500;
  }
});

export function axiosApi() {
  let authToken = null;
  try {
    authToken = JSON.parse(sessionStorage.getItem('auth-token'));
  } catch(e) {}

  axiosAuthHeader.defaults.headers['Authorization'] = authToken && authToken.token;
  return axiosAuthHeader;
}