import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import userReducer from './userReducer';
import snackbarReducer from './snackbarReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    userData: userReducer,
    employeeData: employeeReducer,
  });

export default rootReducer;
