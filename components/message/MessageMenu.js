import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: '70vw',
    marginTop: '-44vh',
  },
}));

export default function MessageMenu({ messageEl, onClose, open, children }) {
  const classes = useStyles();

  return (
    <Menu
      id='simple-menu'
      anchorEl={messageEl}
      open={open}
      onClose={onClose}
      className={classes.root}
    >
      {children}
    </Menu>
  );
}
