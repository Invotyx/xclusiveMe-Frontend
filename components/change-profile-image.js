import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { auth } from '../actions/auth';

export default function FormDialog({ children }) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    dispatch(
      auth.uploadImage({
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
      <Button
        onClick={() => {
          inputFile.current.click();
        }}
      >
        {children}
      </Button>
    </>
  );
}
