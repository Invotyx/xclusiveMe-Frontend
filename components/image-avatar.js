import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { getImage } from '../services/getImage';

export default function ImageAvatar({ liveLink ,src, alt, variant ,...props }) {
  return (
    <Avatar
      {...props}
      alt={alt}
      src={liveLink ? liveLink : src ? getImage(src) : '/avtar.jpg'}
      variant={variant && variant}
    />
  );
}
