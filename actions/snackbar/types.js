import { createActionTypes } from '../../utils';

export const SNACKBAR = createActionTypes('SNACKBAR', [
  'UPDATE',
  'SHOW',
  'HIDE',
]);

export default SNACKBAR;
