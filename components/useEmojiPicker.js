import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';

export default function useEmojiPicker() {
  const [show, setShow] = useState(null);
  const emojiPickerRef = React.useRef(null);

  const toggleEmojiPicker = event => {
    setShow(s => !s);
  };

  const closeEmojiPicker = event => {
    setShow(false);
  };

  const EmojiPicker = ({ popperProps, ...props }) => (
    <>
      <IconButton onClick={toggleEmojiPicker} style={{ color: '#868686' }} size="large">
        <InsertEmoticonIcon />
      </IconButton>
      <Popper
        open={show}
        anchorEl={emojiPickerRef?.current}
        transition
        {...popperProps}
      >
        <ClickAwayListener onClickAway={toggleEmojiPicker}>
          <Picker
            title={''}
            set='facebook'
            emoji='point_up'
            theme='dark'
            skin={1}
            {...props}
          />
        </ClickAwayListener>
      </Popper>
    </>
  );

  return {
    emojiPickerRef,
    toggleEmojiPicker,
    closeEmojiPicker,
    EmojiPicker,
  };
}
