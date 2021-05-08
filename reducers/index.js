import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import paymentReducer from './paymentReducer';
import userReducer from './userReducer';
import bottomAlertReducer from './bottomAlertReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    authData: authReducer,
    employeeData: employeeReducer,
    userData: userReducer,
    paymentData: paymentReducer,
    bottomAlertData: bottomAlertReducer,
  });

export default rootReducer;
