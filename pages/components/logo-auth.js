import React from 'react';
import Link from '@material-ui/core/Link';
import Image from 'next/image';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
              <Link variant='body2'>
                <a>How it works</a>
              </Link>
            </NextLink>
          </Box>
          <Box ml={3}>
            <NextLink href='#'>
              <Link variant='body2'>
                <a>Support</a>
              </Link>
            </NextLink>
          </Box>
          <Box ml={3}>
            <NextLink href='/login'>
              <Link variant='body2'>
                <a>Logout</a>
              </Link>
            </NextLink>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar>
        <Box flexGrow={1}>
          <Image width={50} height={50} src='/logo.png' alt='Logo' />
        </Box>
        <Box flexGrow={1}>
          <Box display='flex'>
            <Button color='inherit'>New Post</Button>
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
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <MonetizationOnOutlinedIcon />
                </ListItemIcon>
                Earnings
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <BookmarkBorderOutlinedIcon />
                </ListItemIcon>
                Bookmarks
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <FeaturedPlayListOutlinedIcon />
                </ListItemIcon>
                Follow list
              </MenuItem>
              <Divider />
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <CreditCardOutlinedIcon />
                </ListItemIcon>
                Card
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <AccountBalanceOutlinedIcon />
                </ListItemIcon>
                Bank
              </MenuItem>
              <Divider />
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <HelpOutlineOutlinedIcon />
                </ListItemIcon>
                Help & Support
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <HighlightOutlinedIcon />
                </ListItemIcon>
                Light mode
              </MenuItem>
              <MenuItem onClick={settingsMenuClose}>
                <ListItemIcon>
                  <LanguageOutlinedIcon />
                </ListItemIcon>
                English
              </MenuItem>
              <Divider />
              <NextLink href='/login'>
                <MenuItem onClick={settingsMenuClose}>
                  <ListItemIcon>
                    <ExitToAppOutlinedIcon />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </NextLink>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
