import { createAction } from '../../utils';
import { SNACKBAR } from './types';

export const snackbar = {
  update: (data) =>
    createAction(SNACKBAR.UPDATE, {
      ...data,
    }),
  show: () =>
    createAction(SNACKBAR.SHOW, {
      show: true,
    }),
  hide: () =>
    createAction(SNACKBAR.HIDE, {
      show: false,
    }),
};
