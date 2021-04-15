import { useRouter } from 'next/router';
import React from 'react';
import Link from '@material-ui/core/Link';
import Image from 'next/image';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import RoundedButton from './RoundedButton';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { currentUserSelector } from '../selectors/authSelector';
import { useSelector } from 'react-redux';
import axiosInterceptorResponse from '../services/axiosInterceptorResponse';
import { auth } from '../actions/auth';
import { useDispatch } from 'react-redux';

export default function Comp() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    axiosInterceptorResponse(dispatch);
    const authorizationToken = localStorage.getItem('jwtToken');
    authorizationToken && dispatch(auth.success({ loggedIn: true }));
    dispatch(auth.me());
  }, []);
  const userSelector = useSelector(currentUserSelector);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/login');
  };

  return (
    <AppBar position='absolute' color='transparent' elevation={0}>
      <Toolbar>
        <Box flexGrow={1} />
        <Box display='flex'>
          <Box ml={3}>
            <NextLink href='#'>
              <Link variant='body2'>How it works</Link>
            </NextLink>
          </Box>
          <Box ml={3}>
            <NextLink href='#'>
              <Link variant='body2'>Support</Link>
            </NextLink>
          </Box>
          <Box ml={3}>
            <Link variant='body2' onClick={logout}>
              Logout
            </Link>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar>
        <Box flexGrow={1}>
          <NextLink href='/explore'>
            <Image width={50} height={50} src='/logo.svg' alt='Logo' />
          </NextLink>
        </Box>
        <Box flexGrow={1}>
          <Box display='flex'>
            <Box mr={1} display='flex'>
              <RoundedButton
                color='inherit'
                startIcon={
                  <Image
                    width={20}
                    height={20}
                    src='/new-post-icon.svg'
                    alt='new post'
                  />
                }
              >
                New Post
              </RoundedButton>
            </Box>
            <NextLink href='/profile'>
              <Avatar
                alt='Remy Sharp'
                src='https://material-ui.com/static/images/avatar/1.jpg'
              />
            </NextLink>
          </Box>
        </Box>
        <Box display='flex'>
          <Box ml={3}>
            <IconButton color='inherit'>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box ml={3}>
            <IconButton color='inherit'>
              <Badge color='secondary' variant='dot'>
                <CheckBoxOutlineBlankIcon />
              </Badge>
            </IconButton>
          </Box>

          <Box ml={3}>
            <IconButton color='inherit'>
              <SmsIcon />
            </IconButton>
          </Box>
          <Box ml={3}>
            <NextLink href='/settings/account'>
              <IconButton color='inherit'>
                <SettingsIcon />
              </IconButton>
            </NextLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
