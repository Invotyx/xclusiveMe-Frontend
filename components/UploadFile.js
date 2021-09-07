import React from 'react';

export default function UploadFile({
  children,
  handleFileChange,
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
        accept='audio/*'
        name='audio'
        multiple={false}
        hidden
        onChange={onChangeInputFile}
      />

      <Children
        onClick={() => {
          inputFile.current.click();
        }}
      />
    </>
  );
}
