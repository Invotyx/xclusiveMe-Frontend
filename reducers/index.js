import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import paymentReducer from './paymentReducer';
import userReducer from './userReducer';
import bottomAlertReducer from './bottomAlertReducer';
import postReducer from './postReducer';
import subscriptionReducer from './subscriptionReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    authData: authReducer,
    employeeData: employeeReducer,
    userData: userReducer,
    paymentData: paymentReducer,
    postData: postReducer,
    subscriptionData: subscriptionReducer,
    bottomAlertData: bottomAlertReducer,
  });

export default rootReducer;
