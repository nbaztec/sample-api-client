/**
 * Created by nisheeth on 26/7/16.
 */

import { renderComponent, expect, simulate, spy } from '../../helper';
import SignIn from '../../../public/javascripts/app/components/auth/sign-in';

describe('SignIn', () => {

  let component;

  beforeEach(() => {
    component = renderComponent(SignIn);
  });

  it('shows form', () => {
    expect(component.find('form')).to.exist;
    expect(component.find('form input').length).to.equal(2);
    expect(component.find('form button')).to.exist;
  });

  describe('Form behavior', () => {

    beforeEach(() => {
      SignIn.prototype.handleSubmitPassback = spy(() => {
      });
      component = renderComponent(SignIn);
    });

    it('shows both required validation errors', () => {
      simulate(component.find('form input:eq(0)'), 'change', '');
      simulate(component.find('form input:eq(1)'), 'change', '');
      simulate(component.find('form'), 'submit');
      expect(component.find('form .text-danger').length).to.equal(2);
      expect(component.find('form .text-danger:eq(0)')).to.contain('Required');
      expect(component.find('form .text-danger:eq(1)')).to.contain('Required');
    });

    it('shows username length validation error', () => {
      simulate(component.find('form input:eq(0)'), 'change', 'a-very-long-username-greater-than-15-characters');
      simulate(component.find('form input:eq(1)'), 'change', '123456');
      simulate(component.find('form'), 'submit');
      expect(component.find('form .text-danger').length).to.equal(1);
      expect(component.find('form .text-danger')).to.contain('Must be 15 characters or less');
    });

    it('shows password length validation error', () => {
      simulate(component.find('form input:eq(0)'), 'change', 'joe');
      simulate(component.find('form input:eq(1)'), 'change', '123');
      simulate(component.find('form'), 'submit');
      expect(component.find('form .text-danger').length).to.equal(1);
      expect(component.find('form .text-danger')).to.contain('Must be 6 characters or more');
    });

    it('successfully submits', () => {
      simulate(component.find('form input:eq(0)'), 'change', 'testing');
      simulate(component.find('form input:eq(1)'), 'change', '123456');
      simulate(component.find('form'), 'submit');
      expect(SignIn.prototype.handleSubmitPassback).to.have.been.called.once();
    });
  });

  it('shows api errors', () => {
    component = renderComponent(SignIn, null, {
      apiError: {
        error: true,
        code: 400,
        message: 'Unauthorized'
      }
    });

    expect(component.find('form .alert-danger').length).to.exist;
  });

});