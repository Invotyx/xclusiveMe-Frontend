import { combineReducers } from 'redux-immutable';
import snackbarReducer from './snackbarReducer';

const rootReducer = () =>
  combineReducers({
    snackbarData: snackbarReducer,
  });

export default rootReducer;
