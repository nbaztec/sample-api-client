/**
 * Created by nisheeth on 26/7/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import testUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import jsdom from 'jsdom';
import jquery from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import chaiSpies from 'chai-spies';

import reducers from '../public/javascripts/app/reducers';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

for (let key in global.window) {
  if (!global.window.hasOwnProperty(key)) {
    continue;
  }
  if (key in global) {
    continue;
  }

  global[key] = window[key]
}

const $ = jquery(global.window);

function renderComponent(ComponentClass, props, state) {
  const store = applyMiddleware(reduxThunk)(createStore)(reducers, state);
  const component = testUtils.renderIntoDocument(
    <Provider store={store}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(component));
}

function simulate(targets, eventName, value) {
  targets.each(function() {
    const target = $(this);
    if (value !== null || value !== undefined) {
      target.val(value);
    }
    testUtils.Simulate[eventName](target[0]);
  });
}

chai.use(chaiSpies);
chaiJquery(chai, chai.util, $);

const spy = chai.spy;

export {
  renderComponent,
  simulate,
  expect,
  spy
}
