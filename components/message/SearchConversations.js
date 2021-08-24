import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TileTextField from '../TileTextField';
import { useRouter } from 'next/router';

export default function SearchConversations() {
  const router = useRouter();
  const { pathname, query } = router;
  const { search } = query;
  const [typingTimeout, setTypingTimeout] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState(search || '');
  const handleChange = e => {
    setSearchQuery(e.target.value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        handleSearch(e.target.value);
      }, 1500)
    );
  };
  const handleSubmit = e => {
    e.preventDefault()
    handleSearch(searchQuery)
};
  const handleSearch = search => {
    router.push({
      pathname,
      query: { ...query, search },
    });
};

  return (
    <>
      <form
        noValidate
        autoComplete='off'
        style={{
          flexGrow: 1,
          marginRight: '5px',
        }}
        onSubmit={handleSubmit}
      >
        <TileTextField
          fullWidth
          id='outlined-basic'
          placeholder='Search'
          variant='outlined'
          margin='dense'
          value={searchQuery}
          onChange={handleChange}
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
