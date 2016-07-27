/**
 * Created by nisheeth on 26/7/16.
 */

import { renderComponent, expect } from '../helper';
import App from '../../public/javascripts/app/components/app';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('shows navbar', () => {
    expect(component.find('nav')).to.exist;
  });
});