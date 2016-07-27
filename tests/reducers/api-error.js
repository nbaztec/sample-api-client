/**
 * Created by nisheeth on 26/7/16.
 */

import { expect } from '../helper';
import apiErrorReducer from '../../public/javascripts/app/reducers/api-error';
import {
  API_ERROR,
  API_ERROR_RESET
} from '../../public/javascripts/app/actions/types';


describe('API Error Reducer', () => {

  it('handles undefined action', () => {
    expect(apiErrorReducer({foo: 'bar'}, {type:undefined})).to.eqls({foo: 'bar'})
  });

  it('handles API_ERROR_RESET action', () => {
    expect(apiErrorReducer({code: 404, message: 'Error', error: true}, {type: API_ERROR_RESET}))
      .to.eqls({code: null, message: null, error: false});
  });

  it('handles API_ERROR action', () => {
    expect(apiErrorReducer(undefined, {type: API_ERROR, payload: {code: 404, message: 'Error'}}))
      .to.eqls({code: 404, message: 'Error', error: true});
  });

});