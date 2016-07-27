/**
 * Created by nisheeth on 26/7/16.
 */

import moxios from 'moxios';
import { expect } from '../helper';
import { fetchVersion } from '../../public/javascripts/app/actions/api';
import { axiosApi } from '../../public/javascripts/app/services/axios';
import {
  API_ERROR_RESET,
  API_ERROR,
  API_RESPONSE_VERSION
} from '../../public/javascripts/app/actions/types';


describe('API Actions', () => {

  beforeEach(() => {
    moxios.install(axiosApi());
  });

  afterEach(() => {
    moxios.uninstall(axiosApi());
  });

  describe('fetchVersion', () => {
    it('dispatches success', (done) => {

      const expectedActions = [
        { type: API_ERROR_RESET },
        { type: API_RESPONSE_VERSION, payload: '1.0' }
      ];

      moxios.stubRequest('http://localhost:9001/api', {
        status: 200,
        responseText: {version: '1.0'}
      });

      fetchVersion()(action => {
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
        { type: API_ERROR, payload: { code: 400, message: 'Unauthorized access'} }
      ];

      moxios.stubRequest('http://localhost:9001/api', {
        status: 400,
        responseText: {error: 'Unauthorized access'}
      });

      fetchVersion()(action => {
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

    it('dispatches network error', (done) => {

      moxios.uninstall(axiosApi());
      const expectedActions = [
        { type: API_ERROR_RESET },
        { type: API_ERROR, payload: { code: 500, message: 'Network Error'} }
      ];

      fetchVersion()(action => {
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
  });

});