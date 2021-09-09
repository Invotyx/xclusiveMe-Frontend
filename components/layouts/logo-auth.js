import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import axiosInterceptorResponse from '../../services/axiosInterceptorResponse';
import { auth } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import SortIcon from '@material-ui/icons/Sort';
import Logo from './logo';
import Notification from '../notification';
import NewPostDialog from '../new-post';
import CurrentUserProfileImageAvatar from '../profile/current-user-profile-image-avatar';
import NotificationMenu from '../notification/menu';
import { post } from '../../actions/post';
import { notificationsCount } from '../../selectors/postSelector';
import styles from './layout.module.css';
import { fetchingSelector } from '../../selectors/postSelector';
import ConversationsList from '../message/ConversationsList';
import MessageMenu from '../message/MessageMenu';
import { currentUserSelector } from '../../selectors/authSelector';
import { notificationsData } from '../../selectors/postSelector';
import { makeStyles } from '@material-ui/core';

const chatMenu = 'link';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '12px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '18px',
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: '48px',
    },
  },
}));

export default function Comp({ sidebarMenu, set_sidebarMenu }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [messageEl, setMessageEl] = React.useState(null);
  const notificationCount = useSelector(notificationsCount);
  const fetchData = useSelector(fetchingSelector);
  const me = useSelector(currentUserSelector);
  const notifications = useSelector(notificationsData);
  const [read, setRead] = useState(0);

  const settingsMenuOpen = event => {
    // dispatch(post.requestNotifications());
    setAnchorEl(event.currentTarget);
  };

  const settingsMenuClose = () => {
    setAnchorEl(null);
  };

  const messagesClose = () => {
    setMessageEl(null);
  };

  React.useEffect(() => {
    dispatch(post.requestNotifications());
  }, []);

  React.useEffect(() => {
    notifications?.map(n => n.isRead === false && setRead(read + 1));
  }, [notifications]);

  React.useEffect(() => {
    axiosInterceptorResponse(dispatch);
    const authorizationToken = localStorage.getItem('jwtToken');
    if (authorizationToken) {
      dispatch(auth.me());
    } else {
      dispatch(auth.redirectToLoginPage(router.asPath));
    }
  }, []);

  const logout = event => {
    event.preventDefault();
    dispatch(
      auth.logout({
        callback: () => {
          dispatch(auth.redirectToLoginPage());
        },
      })
    );
  };

  return (
    <>
      <AppBar
        position='relative'
        color='transparent'
        elevation={0}
        className={classes.root}
      >
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
                <Box mr={1} display='flex' className={'step-2'}>
                  <NewPostDialog />
                </Box>
                <NextLink passHref href={`/x/${me?.username}`}>
                  <IconButton component='a' color='inherit'>
                    <CurrentUserProfileImageAvatar />
                  </IconButton>
                </NextLink>
              </Box>
            </Box>
            <Box display='flex'>
              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <NextLink href='/search' passHref>
                  <IconButton color='inherit' className='step-3'>
                    <SearchIcon />
                  </IconButton>
                </NextLink>
              </Box>
              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <IconButton
                  color='inherit'
                  onClick={settingsMenuOpen}
                  className='step-5'
                >
                  {read > 0 ? (
                    <Badge color='secondary' variant='dot'>
                      <CheckBoxOutlineBlankIcon />
                    </Badge>
                  ) : (
                    <Badge color='secondary'>
                      <CheckBoxOutlineBlankIcon />
                    </Badge>
                  )}
                </IconButton>

                <div>
                  <NotificationMenu
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={settingsMenuClose}
                  >
                    <div className={styles.notiBox}>
                      <Notification setAnchorEl={setAnchorEl} />
                    </div>
                  </NotificationMenu>
                </div>
              </Box>

              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                {chatMenu === 'link' ? (
                  <NextLink href='/chat' passHref>
                    <IconButton color='inherit' className='step-6'>
                      <Badge color='secondary' variant={'dot'}>
                        <SmsIcon />
                      </Badge>
                    </IconButton>
                  </NextLink>
                ) : (
                  <>
                    <IconButton
                      color='inherit'
                      className='step-6'
                      onClick={e => setMessageEl(e.currentTarget)}
                    >
                      <Badge color='secondary' variant={'dot'}>
                        <SmsIcon />
                      </Badge>
                    </IconButton>
                    <div>
                      <MessageMenu anchorEl={messageEl} onClose={messagesClose}>
                        <ConversationsList />
                      </MessageMenu>
                    </div>
                  </>
                )}
              </Box>
              <Box ml={3}>
                <NextLink href='/settings/account' passHref>
                  <IconButton color='inherit' className='step-4'>
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
    </>
  );
}
