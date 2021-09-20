import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import NextLink from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import CurrentUserProfileImageAvatar from '../profile/current-user-profile-image-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../actions/post';
import { notificationsCount } from '../../selectors/postSelector';
import { currentUserSelector } from '../../selectors/authSelector';

const useStyles = makeStyles(theme => ({
  bottom: {
    top: 'auto',
    bottom: '0',
  },
  black: {
    backgroundColor: '#000',
  },
}));

export default function Comp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notiCount = useSelector(notificationsCount);
  const currentUser = useSelector(currentUserSelector);

  const handleGetNotifications = () => {
    dispatch(post.requestNotifications());
  };
  return <>
    <AppBar
      position='fixed'
      color='transparent'
      elevation={0}
      className={`${classes.bottom} ${classes.black}`}
    >
      <Box clone display='flex' justifyContent='space-around'>
        <Toolbar>
          <NextLink passHref href='/explore'>
            <IconButton color='inherit' size="large">
              <HomeIcon />
            </IconButton>
          </NextLink>
          <NextLink passHref href='/search'>
            <IconButton color='inherit' size="large">
              <SearchIcon />
            </IconButton>
          </NextLink>
          <NextLink passHref href='/new-post'>
            <IconButton color='inherit' size="large">
              <Image
                width={40}
                height={40}
                src='/new-post-icon.svg'
                alt='new post'
              />
            </IconButton>
          </NextLink>
          <div onClick={handleGetNotifications}>
            <NextLink passHref href='/notification'>
              <IconButton color='inherit' size="large">
                {notiCount == 0 ? (
                  <Badge color='secondary'>
                    <CheckBoxOutlineBlankIcon />
                  </Badge>
                ) : (
                  <Badge color='secondary' variant='dot'>
                    <CheckBoxOutlineBlankIcon />
                  </Badge>
                )}
              </IconButton>
            </NextLink>
          </div>

          <NextLink passHref href={`/x/${currentUser?.username}`}>
            <IconButton color='inherit' size="large">
              <CurrentUserProfileImageAvatar />
            </IconButton>
          </NextLink>
        </Toolbar>
      </Box>
    </AppBar>
  </>;
}
