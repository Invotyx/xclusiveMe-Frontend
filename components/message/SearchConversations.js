import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TileTextField from '../TileTextField';

export default function SearchConversations() {
  return (
    <>
      <form
        noValidate
        autoComplete='off'
        style={{
          flexGrow: 1,
          marginRight: '5px',
        }}
      >
        <TileTextField
          fullWidth
          id='outlined-basic'
          placeholder='Search'
          variant='outlined'
          margin='dense'
          InputProps={{
            startAdornment: (
              <SearchIcon fontSize='small' style={{ color: '#7c8080' }} />
            ),
          }}
        />
      </form>
    </>
  );
}
