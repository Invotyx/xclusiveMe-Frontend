import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../actions/auth';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

export default function FormDialog({ children }) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    dispatch(
      auth.uploadCover({
        fileObject: image,
      })
    );
  };

  return (
    <>
      <input
        accept='image/*'
        type='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />
      <IconButton
        aria-label='settings'
        onClick={() => inputFile.current.click()}
      >
        <CameraAltIcon style={{ color: '#606366' }} />
      </IconButton>
    </>
  );
}
