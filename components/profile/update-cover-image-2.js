import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../actions/auth';
import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import DepressedButton from '../DepressedButton';

export default function UpdateCoverImage({ inputRef, children }) {
  const dispatch = useDispatch();
  const inputFile = inputRef || React.useRef(null);

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
      {children ? (
        <DepressedButton
          onClick={() => {
            inputFile.current.click();
          }}
        >
          {children}
        </DepressedButton>
      ) : (
        <IconButton
          aria-label='settings'
          onClick={() => inputFile.current.click()}
        >
          <CameraAltIcon style={{ color: '#606366' }} />
        </IconButton>
      )}
    </>
  );
}
