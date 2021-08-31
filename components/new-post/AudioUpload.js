import React from 'react';
import { useDispatch } from 'react-redux';
import { chat } from '../../actions/chat';
import UploadFile from '../UploadFile';

export default function AudioUpload({
  onFileSelection,
  uploadResponseHandler,
  onUploadComplete,
  children,
}) {
  const dispatch = useDispatch();

  const onChangeFile = files => {
    for (let i = 0; i < files.length; i++) {
      var temp = URL.createObjectURL(files[i]);
      onFileSelection && onFileSelection(temp);
    }
    dispatch(
      chat.sendVoicemail({
        audioFile: files,
        callback: response => {
          uploadResponseHandler(response);
          onUploadComplete && onUploadComplete();
        },
      })
    );
  };

  return (
    <>
      <UploadFile handleFileChange={onChangeFile}>{children}</UploadFile>
    </>
  );
}
