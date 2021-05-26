import { createAction } from '../../utils';
import { PAYMENT_METHOD } from './types';

export const paymentMethod = {
  request: () =>
    createAction(PAYMENT_METHOD.GET, {
      fetching: true,
      success: false,
      error: null,
    }),
  save: (data) =>
    createAction(PAYMENT_METHOD.SAVE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  setDefault: (id, callback) =>
    createAction(PAYMENT_METHOD.SET_DEFAULT, {
      id,
      callback,
      fetching: true,
      success: false,
      error: null,
    }),
  delete: (id, callback) =>
    createAction(PAYMENT_METHOD.DELETE, {
      id,
      callback,
      fetching: true,
      success: false,
      error: null,
    }),
  success: (data) =>
    createAction(PAYMENT_METHOD.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: (error) =>
    createAction(PAYMENT_METHOD.FAILURE, {
      ...error,
      fetching: false,
      success: false,
    }),
};
