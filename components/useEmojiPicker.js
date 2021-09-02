import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function useEmojiPicker() {
  const [anchorEl, setAnchorEl] = useState(null);

  const show = Boolean(anchorEl);

  const toggleEmojiPicker = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const EmojiPicker = props => (
    <>
      <IconButton onClick={toggleEmojiPicker}>
        <InsertEmoticonIcon />
      </IconButton>
      {show && (
        <ClickAwayListener onClickAway={toggleEmojiPicker}>
          <Picker
            title={''}
            set='facebook'
            emoji='point_up'
            theme='dark'
            skin={1}
            style={{
              position: 'absolute',
              bottom: '50px',
              right: '90px',
              maxWidth: '300px',
              with: '100%',
              outline: 'none',
            }}
            {...props}
          />
        </ClickAwayListener>
      )}
    </>
  );

  return {
    toggleEmojiPicker,
    EmojiPicker,
  };
}