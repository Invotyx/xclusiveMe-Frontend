import React from 'react';
import Button from '@mui/material/Button';

export default function UploadFile({
  children,
  handleFileChange,
  buttonProps,
  inputProps,
}) {
  const inputFile = React.useRef(null);

  const Children = props => React.cloneElement(children, props);

  const onChangeInputFile = event => {
    event.stopPropagation();
    event.preventDefault();
    handleFileChange(event.target.files);
  };

  return (
    <>
      <input
        ref={inputFile}
        type='file'
        hidden
        onChange={onChangeInputFile}
        {...inputProps}
      />

      {children ? (
        <Children
          onClick={() => {
            inputFile.current.click();
          }}
        />
      ) : (
        <Button
          onClick={() => {
            inputFile.current.click();
          }}
          {...buttonProps}
        >
          Select File
        </Button>
      )}
    </>
  );
}
