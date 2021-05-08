import { createAction } from '../../utils';
import { BOTTOMALERT } from './types';

export const bottomalert = {
  update: (data) =>
    createAction(BOTTOMALERT.UPDATE, {
      ...data,
    }),
  show: () =>
    createAction(BOTTOMALERT.SHOW, {
      show: true,
    }),
  hide: () =>
    createAction(BOTTOMALERT.HIDE, {
      show: false,
    }),
};
