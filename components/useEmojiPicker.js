import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';

export default function useEmojiPicker() {
  const [anchorEl, setAnchorEl] = useState(null);

  const show = Boolean(anchorEl);
  const id = show ? 'emoji-picker-popper' : undefined;

  const toggleEmojiPicker = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const EmojiPicker = props => (
    <>
      <IconButton aria-describedby={id} onClick={toggleEmojiPicker}>
        <InsertEmoticonIcon />
      </IconButton>
      <Popper id={id} open={show} anchorEl={anchorEl} transition>
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
    toggleEmojiPicker,
    EmojiPicker,
  };
}
