import { createAction } from '../../utils';
import { PAYMENT } from './types';

export const payment = {
  request: () =>
    createAction(PAYMENT.GET, { fetching: true, success: false, error: null }),
  addPayment: (name, token) =>
    createAction(PAYMENT.ADD_PAYMENT, {
      name,
      token,
      fetching: true,
      success: false,
      error: null,
    }),
  setDefault: (id) =>
    createAction(PAYMENT.SET_DEFAULT, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  delete: (id) =>
    createAction(PAYMENT.DELETE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  success: (data) =>
    createAction(PAYMENT.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
};
