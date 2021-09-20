import React from 'react';
import Avatar from '@mui/material/Avatar';
import { getImage } from '../services/getImage';

export default function ImageAvatar({ src, alt, ...props }) {
  return (
    <Avatar {...props} alt={alt} src={src ? getImage(src) : '/avtar.jpg'} />
  );
}
