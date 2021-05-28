import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getImage } from '../services/getImage';

export default function ImageAvatar(props) {
  const { user, src, alt, ...other } = props;

  return (
    <Avatar
      {...other}
      alt={alt || (user && user.username)}
      src={
        src ||
        (user && user.image
          ? getImage(user.image)
          : 'https://material-ui.com/static/images/avatar/1.jpg')
      }
    />
  );
}
