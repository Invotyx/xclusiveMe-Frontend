import { fromJS } from 'immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
  const composeEnhancers = compose;

  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    rootReducer(history),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
