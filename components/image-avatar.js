import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getImage } from '../services/getImage';

export default function ImageAvatar({ src, alt, ...props }) {
  return (
    <Avatar
      {...props}
      alt={alt}
      src={
        src
          ? getImage(src)
          : 'https://material-ui.com/static/images/avatar/1.jpg'
      }
    />
  );
}
