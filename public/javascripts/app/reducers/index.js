/**
 * Created by nisheeth on 25/7/16.
 */

import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './auth';
import apiErrorReducer from './api-error';
import apiDataReducer from './api-data';

const rootReducer = combineReducers({
  form: reduxForm,
  auth: authReducer,
  apiError: apiErrorReducer,
  apiData: apiDataReducer
});

export default rootReducer;