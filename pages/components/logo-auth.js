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

export default function Comp() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const settingsMenuClose = () => {
    setAnchorEl(null);
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
            <NextLink href='/login'>
              <Link variant='body2'>Logout</Link>
            </NextLink>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar>
        <Box flexGrow={1}>
          <NextLink href='/explore'>
            <Image width={50} height={50} src='/logo.png' alt='Logo' />
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
            <Avatar
              alt='Remy Sharp'
              src='https://material-ui.com/static/images/avatar/1.jpg'
            />
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
            <IconButton
              color='inherit'
              aria-controls='simple-menu'
              onClick={settingsMenuOpen}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              keepMounted
              onClose={settingsMenuClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <NextLink href='/settings/account'>
                <MenuItem onClick={settingsMenuClose}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Settings' />
                </MenuItem>
              </NextLink>
              <Divider />
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <MonetizationOnOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Earnings' />
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <BookmarkBorderOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Bookmarks' />
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <FeaturedPlayListOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Follow list' />
              </MenuItem>
              <Divider />
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <CreditCardOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Card' />
                <ListItemSecondaryAction>
                  For subscriptions
                </ListItemSecondaryAction>
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <AccountBalanceOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Bank' />
                <ListItemSecondaryAction>For earnings</ListItemSecondaryAction>
              </MenuItem>
              <Divider />
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <HelpOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Help & Support' />
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <HighlightOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Light mode' />
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <LanguageOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='English' />
              </MenuItem>
              <Divider />
              <NextLink href='/login'>
                <MenuItem onClick={settingsMenuClose}>
                  <ListItemIcon>
                    <ExitToAppOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </MenuItem>
              </NextLink>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
