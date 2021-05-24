import React from 'react';
import Popover from '@material-ui/core/Popover';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <HelpOutlineIcon fontSize='small' onClick={handlePopoverOpen} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
      >
        hi
      </Popover>
    </>
  );
}
