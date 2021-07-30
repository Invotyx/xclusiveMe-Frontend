import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Image from 'next/image';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import CurrentUserProfileImageAvatar from '../profile/current-user-profile-image-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../actions/post';
import { notificationsCount } from '../../selectors/postSelector';

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

  const handleGetNotifications = () => {
    dispatch(post.requestNotifications());
  };
  return (
    <>
      <AppBar
        position='fixed'
        color='transparent'
        elevation={0}
        className={`${classes.bottom} ${classes.black}`}
      >
        <Box clone display='flex' justifyContent='space-around'>
          <Toolbar>
            <NextLink passHref href='/explore'>
              <IconButton color='inherit'>
                <HomeIcon />
              </IconButton>
            </NextLink>
            <NextLink passHref href='/search'>
              <IconButton color='inherit'>
                <SearchIcon />
              </IconButton>
            </NextLink>
            <NextLink passHref href='/new-post'>
              <IconButton color='inherit'>
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
                <IconButton color='inherit'>
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

            <NextLink passHref href='/profile'>
              <IconButton color='inherit'>
                <CurrentUserProfileImageAvatar />
              </IconButton>
            </NextLink>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
}
