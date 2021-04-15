import { useRouter } from 'next/router';
import React from 'react';
import Link from '@material-ui/core/Link';
import Image from 'next/image';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import RoundedButton from './RoundedButton';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import HighlightOutlinedIcon from '@material-ui/icons/HighlightOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
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
