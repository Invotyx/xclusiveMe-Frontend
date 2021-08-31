import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function NewPostAudioMenu({
  startRecordingHandler,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size='small' style={{ color: '#666' }} onClick={handleClick}>
        <GraphicEqRoundedIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            startRecordingHandler && startRecordingHandler();
            handleClose();
          }}
        >
          Record
        </MenuItem>
        <MenuItem onClick={handleClose}>Upload</MenuItem>
      </Menu>
    </>
  );
}
