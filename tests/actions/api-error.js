/**
 * Created by nisheeth on 26/7/16.
 */

import { expect } from '../helper';
import { apiError, apiErrorReset } from '../../public/javascripts/app/actions/api-error';
import {
  API_ERROR_RESET,
  API_ERROR
} from '../../public/javascripts/app/actions/types';


describe('API-Error Actions', () => {

  describe('apiError', () => {
    it('dispatches valid non-200 response', (done) => {

      apiError(action => {
        try {
          expect(action).to.eqls({type: API_ERROR, payload: {code: 400, message: 'Not allowed'}});
          done();
        } catch (err) {
          done(err);
        }
      }, { status: 400, data: {error: 'Not allowed'}});

    });

    it('dispatches valid error response', (done) => {

      apiError(action => {
        try {
          expect(action).to.eqls({type: API_ERROR, payload: {code: 500, message: 'Some error'}});
          done();
        } catch (err) {
          done(err);
        }
      }, Error('Some error'));

    });
  });

  describe('apiErrorReset', () => {
    it('apiErrorReset dispatches valid response', (done) => {

      apiErrorReset(action => {
        try {
          expect(action).to.eqls({type: API_ERROR_RESET});
          done();
        } catch (err) {
          done(err);
        }
      }, Error('Some error'));

    });
  });

});