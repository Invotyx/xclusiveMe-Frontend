import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Menu from '@mui/material/Menu';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
  },
}));

export default function MessageMenu({ anchorEl, onClose, children }) {
  const classes = useStyles();

  return (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      className={classes.root}
    >
      {children}
    </Menu>
  );
}
