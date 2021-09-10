import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../actions/auth';
import DepressedButton from '../DepressedButton';

export default function ChangeProfileImage({
  inputRef,
  buttonProps,
  children,
}) {
  const dispatch = useDispatch();
  const inputFile = inputRef || React.useRef(null);

  const onChangeFile = event => {
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

      <DepressedButton
        {...buttonProps}
        onClick={() => {
          inputFile.current.click();
        }}
      >
        {children}
      </DepressedButton>
    </>
  );
}
