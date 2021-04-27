import { useRouter } from 'next/router';
import React from 'react';
import Link from '@material-ui/core/Link';
import Image from 'next/image';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import RoundedButton from './RoundedButton';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import axiosInterceptorResponse from '../services/axiosInterceptorResponse';
import { auth } from '../actions/auth';
import { useDispatch } from 'react-redux';
import SortIcon from '@material-ui/icons/Sort';
import Logo from './logo';
import ProfieImageAvatar from './profile-image-avatar';

export default function Comp({ profile, sidebarMenu, set_sidebarMenu }) {
  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(() => {
    axiosInterceptorResponse(dispatch);
    const authorizationToken = localStorage.getItem('jwtToken');
    if (authorizationToken) {
      dispatch(auth.me());
    } else {
      router.push('/login');
    }
  }, []);

  const logout = (event) => {
    event.preventDefault();
    dispatch(
      auth.logout({
        callback: () => {
          router.push('/login');
        },
      })
    );
  };

  return (
    <Box clone mb={6}>
      <AppBar position='relative' color='transparent' elevation={0}>
        <Box
          display={{ xs: 'none', sm: 'none', md: 'flex' }}
          justifyContent='flex-end'
        >
          <Toolbar>
            <Box display='flex'>
              <Box ml={3}>
                <NextLink href='#' passHref>
                  <Link variant='body2'>How it works</Link>
                </NextLink>
              </Box>
              <Box ml={3}>
                <NextLink href='#' passHref>
                  <Link variant='body2'>Support</Link>
                </NextLink>
              </Box>
              <Box ml={3}>
                <NextLink href='#' passHref>
                  <Link variant='body2' onClick={logout}>
                    Logout
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Toolbar>
        </Box>
        <Box clone mt={{ xs: 4, sm: 4, md: 0 }}>
          <Toolbar>
            <Box flexGrow={1}>
              <Logo link='/explore' />
            </Box>
            <Box flexGrow={1} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
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
                  <IconButton component='a' color='inherit'>
                    <ProfieImageAvatar />
                  </IconButton>
                </NextLink>
              </Box>
            </Box>
            <Box display='flex'>
              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <NextLink href='/search'>
                  <IconButton color='inherit'>
                    <SearchIcon />
                  </IconButton>
                </NextLink>
              </Box>
              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <IconButton color='inherit'>
                  <Badge color='secondary' variant='dot'>
                    <CheckBoxOutlineBlankIcon />
                  </Badge>
                </IconButton>
              </Box>

              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
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
              {sidebarMenu !== undefined && (
                <Box ml={3} display={{ xs: 'flex', sm: 'flex', md: 'none' }}>
                  <IconButton
                    color='inherit'
                    onClick={() =>
                      sidebarMenu
                        ? set_sidebarMenu(false)
                        : set_sidebarMenu(true)
                    }
                  >
                    <SortIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
