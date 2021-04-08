import { combineReducers } from 'redux-immutable';
import employeeReducer from './employeeReducer';
import snackbarReducer from './snackbarReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
    employeeData: employeeReducer,
  });

export default rootReducer;
