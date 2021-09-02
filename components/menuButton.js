import { IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import ReportModal from './profile/ReportModal';
import { useDispatch } from 'react-redux';
import { snackbar } from '../actions/snackbar';
import { post } from '../actions/post';

const ManuButton = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReportModal, setreportModal] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpenmenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenReportModal = () => {
    setAnchorEl(null);
    setreportModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://dev.xclusiveme.ga/singlePost?postId=${props.postid}`
    );

    dispatch(
      snackbar.update({
        open: true,
        message: 'Copied to clipboard',
        severity: 'success',
      })
    );

    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleReportModal = () => {
    setreportModal(true);
  };

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleOpenmenu}
      >
        <MoreVertIcon />
      </IconButton>

      {props.post?.media.length === 0 ? (
        <></>
      ) : (
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {props.post && (
            <MenuItem onClick={handleCopy}>Copy link to post</MenuItem>
          )}
          {(!props.post ||
            props.post?.user.username !== props.currentUser?.username) && (
            <MenuItem onClick={handleOpenReportModal}>Report</MenuItem>
          )}
        </Menu>
      )}

      <ReportModal
        openReportModal={openReportModal}
        setreportModal={setreportModal}
        {...props}
      />
    </>
  );
};

export default ManuButton;
