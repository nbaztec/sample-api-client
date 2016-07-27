/**
 * Created by nisheeth on 26/7/16.
 */

import { renderComponent, expect } from '../../helper';
import SignOut from '../../../public/javascripts/app/components/auth/sign-out';

describe('SignOut', () => {

  let component;

  global.sessionStorage = {
    removeItem: () => {}
  };

  beforeEach(() => {
    component = renderComponent(SignOut);
  });

  it('is rendered', () => {
    expect(component.find('h2')).to.contain('Signing out');
  });

});