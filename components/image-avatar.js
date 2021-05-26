import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getImage } from '../services/getImage';

export default function FormDialog(props) {
  const { user, ...other } = props;

  return (
    <Avatar
      {...other}
      alt={user && user.username}
      src={
        user && user.image
          ? getImage(user.image)
          : 'https://material-ui.com/static/images/avatar/1.jpg'
      }
    />
  );
}
