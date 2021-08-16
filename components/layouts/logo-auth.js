import { useRouter } from 'next/router';
import React from 'react';
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
import { getNotifications } from '../../services/post.service';
import { post } from '../../actions/post';
import { notificationsCount } from '../../selectors/postSelector';
import styles from './layout.module.css';
import { fetchingSelector } from '../../selectors/postSelector';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import Message from '../message/Message';
import MessageMenu from '../message/MessageMenu';

export default function Comp({ sidebarMenu, set_sidebarMenu }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [messageEl, setMessageEl] = React.useState(null);
  const listofNotifications = useSelector(getNotifications);
  const notificationCount = useSelector(notificationsCount);
  const fetchData = useSelector(fetchingSelector);

  const settingsMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const settingsMenuClose = () => {
    setAnchorEl(null);
  };

  const messagesOpen = e => {
    setMessageEl(e.currentTarget);
  };

  const messagesClose = () => {
    setMessageEl(null);
  };

  // React.useEffect(() => {
  //   dispatch(post.requestNotifications());
  // }, []);

  React.useEffect(() => {
    axiosInterceptorResponse(dispatch);
    const authorizationToken = localStorage.getItem('jwtToken');
    if (authorizationToken) {
      dispatch(auth.me());
    } else {
      router.push('/login');
    }
  }, []);

  const logout = event => {
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
                  <NewPostDialog />
                </Box>
                <NextLink passHref href='/profile'>
                  <IconButton component='a' color='inherit'>
                    <CurrentUserProfileImageAvatar />
                  </IconButton>
                </NextLink>
              </Box>
            </Box>
            <Box display='flex'>
              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <NextLink href='/search' passHref>
                  <IconButton color='inherit'>
                    <SearchIcon />
                  </IconButton>
                </NextLink>
              </Box>
              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <IconButton color='inherit' onClick={settingsMenuOpen}>
                  {notificationCount == 0 ? (
                    <Badge color='secondary'>
                      <CheckBoxOutlineBlankIcon />
                    </Badge>
                  ) : (
                    <Badge color='secondary' variant='dot'>
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
                      <Notification onClose={settingsMenuClose} />
                    </div>
                  </NotificationMenu>
                </div>
              </Box>

              <Box ml={3} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                <NextLink href='/chat' passHref>
                <IconButton color='inherit' onClick={messagesOpen}>
                  <SmsIcon />
                </IconButton>
                </NextLink>
                <div>
                  <MessageMenu
                    open={Boolean(messageEl)}
                    messageEl={messageEl}
                    onClose={messagesClose}
                  >
                    <Message onClose={messagesClose} />
                  </MessageMenu>
                </div>
              </Box>
              <Box ml={3}>
                <NextLink href='/settings/account' passHref>
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
