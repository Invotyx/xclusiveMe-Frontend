import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
            <IconButton color='inherit'>
              <HomeIcon />
            </IconButton>
            <IconButton color='inherit'>
              <SearchIcon />
            </IconButton>
            <IconButton color='inherit'>
              <Image
                width={40}
                height={40}
                src='/new-post-icon.svg'
                alt='new post'
              />
            </IconButton>
            <IconButton color='inherit'>
              <Badge color='secondary' variant='dot'>
                <CheckBoxOutlineBlankIcon />
              </Badge>
            </IconButton>
            <IconButton color='inherit'>
              <Avatar
                alt='Remy Sharp'
                src='https://material-ui.com/static/images/avatar/1.jpg'
              />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
}
