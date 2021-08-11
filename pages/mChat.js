import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Layout from '../components/layouts/layout-auth';
import ImageAvatar from '../components/image-avatar';
import styles from './chat.module.css';
import InputEmoji from 'react-input-emoji';
import CurrentUserProfileImageAvatar from '../components/profile/current-user-profile-image-avatar';
import { Button, OutlinedInput } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import NextLink from 'next/link';
import ProfileImageAvatar from '../components/profile/profile-image-avatar';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const mChat = () => {
  const [msgText, setMsgText] = useState('');
  const [show, setShow] = useState(false);

  function handleOnEnter(text) {
    setShow(false);
    console.log('enter', text);
  }
  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMsgText(msgText + emoji);
  };

  const showEmoji = () => {
    setShow(!show);
  };

  return (
    <div>
      <div style={{ marginTop: '10px', marginBottom: '0px' }}>
        <div
          style={{
            display: 'flex',

            justifyContent: 'space-between',
            width: '90%',
            margin: 'auto',
            alignItems: 'center',
          }}
        >
          <NextLink passHref href='/explore'>
            <img src='/logo.svg' alt='logo' />
          </NextLink>

          <CurrentUserProfileImageAvatar />

          <NextLink passHref href='/settings/account'>
            <img src='/setting.svg' alt='' />
          </NextLink>
        </div>

        <div
          style={{
            width: '100%',
            backgroundColor: '#000000',

            padding: '10px',
            height: '200%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <NextLink passHref href='/notification'>
              <img src='backBtn.svg' alt='back' />
            </NextLink>

            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
                marginTop: '-4px',
              }}
            >
              <p
                style={{
                  marginLeft: '20px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                Zeeshan Haider
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '15%',
                marginTop: '-5px',
                marginRight: '10px',
              }}
            >
              <img src='/money.png' alt='' />
              <img src='/menu.png' alt='' />
            </div>
          </div>
          <div style={{ height: '70.4vh' }}>Chat Things</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '40%',
            marginLeft: '4vw',
          }}
        >
          <img src='/camera.svg' alt='camera' />
          <img src='/imageBtn.svg' alt='image' />
          <img src='/videoBtn.svg' alt='video' />
          <img src='/voiceBtn.svg' alt='voice' />
        </div>
        <OutlinedInput
          value={msgText}
          onChange={e => setMsgText(e.target.value)}
          name='msgText'
          multiline
          // disabled={post.media.length === 0}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              if (!event.shiftKey) {
                handleOnEnter(e);
              }
            }
          }}
          // inputRef={searchInput}
          placeholder='Write a message'
          startAdornment={
            <ProfileImageAvatar style={{ marginRight: '10px' }} />
          }
          endAdornment={
            <>
              <Button
                onClick={showEmoji}
                style={{
                  backgroundColor: '#111111',
                  border: 'none',
                }}
              >
                <span role='img'>
                  <InsertEmoticon />
                </span>
              </Button>
              <Button
                onClick={handleOnEnter}
                style={{
                  backgroundColor: '#111111',
                  border: 'none',
                }}
              >
                <img
                  src='/send.png'
                  alt='send button'
                  style={{ marginRight: '10px' }}
                />
              </Button>
            </>
          }
        />
        {show && (
          <span>
            <Picker
              onSelect={addEmoji}
              set='facebook'
              emoji='point_up'
              theme='dark'
              skin='1'
              style={{
                position: 'absolute',
                left: '10px',
                bottom: '70px',
                maxWidth: '300px',
                with: '100%',
                outline: 'none',
              }}
            />
          </span>
        )}
        {/* <div
          style={{
            marginTop: '10px',
            backgroundColor: '#101010',
            display: 'flex',
            borderRadius: '6px',
          }}
        >
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
          <div style={{ marginLeft: '10px', marginTop: '3px' }}>
            <ImageAvatar />
          </div>

          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder='Type a message'
            borderRadius={5}
            borderColor='#101010'
          />

          <textarea rows='3' cols='40' data-emojiable='true'></textarea>

          <Button
            style={{
              backgroundColor: '#111111',
              border: 'none',
            }}
          >
            <img src='/send.png' alt='' />
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default mChat;
