import React, { useState } from 'react';
import Layout from '../components/layouts/layout-auth';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TileTextField from '../components/TileTextField';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useRouter } from 'next/router';
import InputEmoji from 'react-input-emoji';
import { currentUserSelector } from '../selectors/authSelector';
import { useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Chat = () => {
  const classes = useStyles();
  const router = useRouter();
  const [text, setText] = useState('');
  const current = useSelector(currentUserSelector);
  const { user, image } = router.query;

  function handleOnEnter(text) {
    console.log('enter', text);
  }

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <form className={classes.root} noValidate autoComplete='off'>
              <TileTextField
                id='outlined-basic'
                placeholder='Search'
                variant='outlined'
                InputProps={{
                  startAdornment: <SearchIcon style={{ color: '#7c8080' }} />,
                }}
              />
            </form>
            <div
              style={{
                backgroundColor: '#111111',
                padding: '12px',
                borderRadius: '3px',
              }}
            >
              <AddCommentIcon style={{ marginTop: '5px' }} />
            </div>
          </div>

          <div>users</div>
        </div>
        <div>
          <div
            style={{
              width: '40vw',
              backgroundColor: '#101010',
              marginLeft: '30px',
              marginTop: '-6px',
              padding: '10px',
              height: '200%',
              borderRadius: '6px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              >
                <img
                  src={image}
                  alt=''
                  width='50px'
                  height='50px'
                  style={{ borderRadius: '50%' }}
                />
                <p
                  style={{
                    marginLeft: '20px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  {user}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '10%',
                  marginTop: '-10px',
                  marginRight: '10px',
                }}
              >
                <img src='/money.png' alt='' />
                <img src='/menu.png' alt='' />
              </div>
            </div>
            <div style={{ height: '20vh' }}>Chat Things</div>
          </div>
          <div
            style={{
              marginLeft: '30px',
              marginTop: '10px',
              backgroundColor: '#101010',
              display: 'flex',
              borderRadius: '6px',
            }}
          >
            {current?.profileImage ? (
              <img
                src={current.profileImage}
                alt='profile-image'
                width='40px'
                height='40px'
                style={{
                  marginLeft: '10px',
                  marginTop: '5px',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <img
                src='/dp.png'
                alt='profile-image'
                width='40px'
                height='40px'
                style={{
                  marginLeft: '10px',
                  marginTop: '5px',
                  borderRadius: '4px',
                }}
              />
            )}

            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder='Type a message'
              borderRadius={5}
              borderColor='#101010'
            />

            <Button
              style={{
                backgroundColor: '#111111',
                border: 'none',
              }}
            >
              <SendIcon
                style={{
                  cursor: 'pointer',
                  color: 'white',
                }}
              />
            </Button>
          </div>
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
