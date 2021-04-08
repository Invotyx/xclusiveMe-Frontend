import { combineReducers } from 'redux-immutable';
import snackbarReducer from './snackbarReducer';
import { connectRouter } from 'connected-react-router/immutable';
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    snackbarData: snackbarReducer,
  });
export default rootReducer;
