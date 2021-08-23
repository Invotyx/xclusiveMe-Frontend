import { OutlinedInput } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { chat } from '../../actions/chat';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import UploadImageModal from './/uploadImageModal';

export default function MessageSend({ conId }) {
  const current = useSelector(currentUserSelector);
  const [show, setShow] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [imageModal, setImageModal] = useState(false);

  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    setShow(false);

    dispatch(
      chat.sendOneMessage({
        conversationId: Number(conId),
        saveData: {
          // receiver: current.id,
          content: msgText,
          // sentTo: chatsData
          //   .filter(list => list.id == conId)[0]
          //   ?.participants.filter(p => p.id !== current.id)[0].id,
          type: 'text',
          isPaid: false,
        },
        callback: () => {
          setLastMessageReceived(+new Date());
          setMsgText('');
        },
      })
    );
  }

  const handleImageModal = () => {
    if (!msgText || msgText.trim() === '') {
      return;
    }
    setImageModal(true);
  };

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
    <>
      <CardActions
        style={{
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '30%',
          }}
        >
          <img src='/camera.svg' alt='camera' />
          <img src='/imageBtn.svg' alt='image' onClick={handleImageModal} />
          <img src='/videoBtn.svg' alt='video' />
          <img src='/voiceBtn.svg' alt='voice' />
          <UploadImageModal
            imageModal={imageModal}
            setImageModal={setImageModal}
            msgText={msgText}
            setMsgText={setMsgText}
            conId={conId}
          />
        </div>
      </CardActions>

      <CardActions style={{ padding: 0 }}>
        <OutlinedInput
          value={msgText}
          onChange={e => setMsgText(e.target.value)}
          name='msgText'
          margin='dense'
          fullWidth
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
            <ProfileImageAvatar
              user={current}
              style={{ marginRight: '10px' }}
            />
          }
          endAdornment={
            <>
              <IconButton onClick={showEmoji}>
                <InsertEmoticonIcon />
              </IconButton>
              <IconButton onClick={handleOnEnter}>
                <img
                  src='/send.png'
                  alt='send button'
                  style={{ marginRight: '10px' }}
                />
              </IconButton>
            </>
          }
        />
      </CardActions>

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
              bottom: '40px',
              right: '150px',
              maxWidth: '300px',
              with: '100%',
              outline: 'none',
            }}
          />
        </span>
      )}
    </>
  );
}
