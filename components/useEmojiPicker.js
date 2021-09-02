import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';

export default function useEmojiPicker() {
  const [anchorEl, setAnchorEl] = useState(null);
  const myRef = React.useRef(null);

  const show = Boolean(anchorEl);

  const toggleEmojiPicker = event => {
    setAnchorEl(anchorEl ? null : myRef.current);
  };

  const EmojiPicker = props => (
    <>
      <IconButton ref={myRef} onClick={toggleEmojiPicker}>
        <InsertEmoticonIcon />
      </IconButton>
      <Popper open={show} anchorEl={anchorEl} transition>
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
