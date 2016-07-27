/**
 * Created by nisheeth on 26/7/16.
 */

import { expect } from '../helper';
import apiDataReducer from '../../public/javascripts/app/reducers/api-data';
import {
  API_RESPONSE_VERSION,
  USER_SIGN_OUT
} from '../../public/javascripts/app/actions/types';


describe('API Data Reducer', () => {

  it('handles undefined action', () => {
    expect(apiDataReducer({foo: 'bar'}, {type:undefined})).to.eqls({foo: 'bar'})
  });

  it('handles USER_SIGN_OUT action', () => {
    expect(apiDataReducer({version: '1.1'}, {type: USER_SIGN_OUT}))
      .to.eqls({version: null});
  });

  it('handles API_RESPONSE_VERSION action', () => {
    expect(apiDataReducer(undefined, {type: API_RESPONSE_VERSION, payload: '1.0'}))
      .to.eqls({version: '1.0'});
  });

});