import { createActionTypes } from '../../utils';

export const POST = createActionTypes('POST', [
  'GET',
  'SAVE',
  'UPDATE',
  'DELETE',
  'SUCCESS',
  'FAILURE',
  'UPLOAD_IMAGE',
  'UPLOAD_VIDEO_REQ',
  'UPLOAD_VIDEO_FINAL_REQ',
]);

export default POST;
