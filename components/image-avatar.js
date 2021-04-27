import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export default function FormDialog(props) {
  const { user, ...other } = props;

  return (
    <Avatar
      {...other}
      alt={user && user.username}
      src={
        user && user.image
          ? `${SERVER_ADDRESS.substring(0, SERVER_ADDRESS.length - 4)}/${
              user.image
            }`
          : 'https://material-ui.com/static/images/avatar/1.jpg'
      }
    />
  );
}
