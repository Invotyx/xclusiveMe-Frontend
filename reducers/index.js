import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import paymentReducer from './paymentReducer';
import userReducer from './userReducer';
import bottomAlertReducer from './bottomAlertReducer';
import postReducer from './postReducer';
import paymentMethodReducer from './paymentMethodReducer';
import subscriptionReducer from './subscriptionReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    authData: authReducer,
    employeeData: employeeReducer,
    userData: userReducer,
    paymentData: paymentReducer,
    postData: postReducer,
    paymentMethodData: paymentMethodReducer,
    subscriptionData: subscriptionReducer,
    bottomAlertData: bottomAlertReducer,
  });

export default rootReducer;
