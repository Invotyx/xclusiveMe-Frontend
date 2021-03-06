import { createAction } from '../../utils';
import { SUBSCRIPTION } from './types';

export const subscription = {
  request: () =>
    createAction(SUBSCRIPTION.GET, {
      // fetching: true,
      // success: false,
      // error: null,
    }),

  removeSub: data =>
    createAction(SUBSCRIPTION.REMOVE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  add: (id, callback) =>
    createAction(SUBSCRIPTION.ADD, {
      id,
      callback,
      fetching: true,
      success: false,
      error: null,
    }),
  put: data =>
    createAction(SUBSCRIPTION.PUT, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  success: data =>
    createAction(SUBSCRIPTION.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: error =>
    createAction(SUBSCRIPTION.FAILURE, {
      ...error,
      fetching: false,
      success: false,
    }),
};
