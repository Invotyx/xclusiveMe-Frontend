import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

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
