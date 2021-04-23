import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/authSelector';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export default function FormDialog(props) {
  const userSelector = useSelector(currentUserSelector);

  return (
    <Avatar
      {...props}
      alt='Remy Sharp'
      src={
        userSelector && userSelector.image
          ? `${SERVER_ADDRESS.substring(0, SERVER_ADDRESS.length - 4)}/${
              userSelector.image
            }`
          : 'https://material-ui.com/static/images/avatar/1.jpg'
      }
    />
  );
}
