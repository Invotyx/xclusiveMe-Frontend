import React from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import SearchConversations from './SearchConversations';
import MessageModalMedia from './MessageModalMedia';

export default function ConversationsListPrefix({ onMediaUploaded }) {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '10px',
      }}
    >
      <SearchConversations />
      <MessageModalMedia
        type='text'
        onMediaUploaded={onMediaUploaded}
      >
        <IconButton
          size='small'
          style={{
            backgroundColor: '#111111',
            padding: '16px',
            borderRadius: '3px',
            width: '42px',
            height: '42px',
            marginTop: '7px',
          }}
        >
          <AddCommentIcon />
        </IconButton>
      </MessageModalMedia>
    </div>
  );
}
