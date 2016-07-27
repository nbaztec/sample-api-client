/**
 * Created by nisheeth on 26/7/16.
 */

import { renderComponent, expect } from '../helper';
import Header from '../../public/javascripts/app/components/header';

describe('Header', () => {

  let component;

  beforeEach(() => {
    component = renderComponent(Header);
  });

  it('shows sign in to guest', () => {
    expect(component.find('ul.nav.navbar-nav li')).to.contain('Sign In');
  });

  it('shows sign out to user', () => {
    component = renderComponent(Header, null, {
      auth: {
        valid: true,
        token: 'abcdefg-123456'
      }
    });
    expect(component.find('ul.nav.navbar-nav li')).to.contain('Sign Out');
  });

  it('shows signed in user\'s name', () => {
    component = renderComponent(Header, null, {
      auth: {
        valid: true,
        token: 'abcdefg-123456',
        user: 'joe'
      }
    });
    expect(component.find('ul.nav.navbar-nav.navbar-right li')).to.contain('joe');
  });
});