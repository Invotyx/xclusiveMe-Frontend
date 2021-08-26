import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
  },
}));

export default function MessageMenu({ messageEl, onClose, children }) {
  const classes = useStyles();

  return (
    <Menu
      id='simple-menu'
      anchorEl={messageEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      className={classes.root}
    >
      {children}
    </Menu>
  );
}
