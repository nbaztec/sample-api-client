/**
 * Created by nisheeth on 26/7/16.
 */

import { expect, spy } from '../helper';
import { axiosApi } from '../../public/javascripts/app/services/axios';

describe('Axios Service', () => {

  beforeEach(() => {
    global.sessionStorage = {
      getItem: spy(key => {
        return '{ "token": "123456" }';
      })
    }
  });

  it('returns axios with "Authorization" header', () => {
    const instance = axiosApi();
    expect(global.sessionStorage.getItem).to.have.been.called.once.with.exactly('auth-token');
    expect(instance.defaults.headers['Authorization']).to.equal('123456');
  });

});