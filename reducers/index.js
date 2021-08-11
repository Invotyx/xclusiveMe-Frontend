import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import userReducer from './userReducer';
import bottomAlertReducer from './bottomAlertReducer';
import postReducer from './postReducer';
import paymentMethodReducer from './paymentMethodReducer';
import subscriptionReducer from './subscriptionReducer';
import chatReducer from './chatReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    authData: authReducer,
    employeeData: employeeReducer,
    userData: userReducer,
    postData: postReducer,
    paymentMethodData: paymentMethodReducer,
    subscriptionData: subscriptionReducer,
    bottomAlertData: bottomAlertReducer,
    chatData: chatReducer,
  });

export default rootReducer;
