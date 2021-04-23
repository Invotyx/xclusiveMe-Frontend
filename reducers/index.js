import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import paymentReducer from './paymentReducer';
import countriesCitiesReducer from './countriesCitiesReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    authData: authReducer,
    employeeData: employeeReducer,
    countriesCities: countriesCitiesReducer,
    paymentData: paymentReducer,
  });

export default rootReducer;
