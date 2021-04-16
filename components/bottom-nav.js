import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Image from 'next/image';

export default function Comp() {
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value='home' icon={<HomeIcon />} />
        <BottomNavigationAction value='favorites' icon={<SearchIcon />} />
        <BottomNavigationAction
          value='nearby'
          icon={
            <Image
              width={40}
              height={40}
              src='/new-post-icon.svg'
              alt='new post'
            />
          }
        />
        <BottomNavigationAction
          value='folder'
          icon={
            <Badge color='secondary' variant='dot'>
              <CheckBoxOutlineBlankIcon />
            </Badge>
          }
        />
        <BottomNavigationAction
          value='folder'
          icon={
            <Avatar
              alt='Remy Sharp'
              src='https://material-ui.com/static/images/avatar/1.jpg'
            />
          }
        />
      </BottomNavigation>
    </>
  );
}
