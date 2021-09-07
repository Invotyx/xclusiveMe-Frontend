import { IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import useReportModal from './profile/ReportModal';
import { useDispatch } from 'react-redux';
import { snackbar } from '../actions/snackbar';
import { post } from '../actions/post';
import useTipModal from './profile/TipModal';

const ManuButton = ({ onConfirm, tip, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpenmenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const { ReportModal, setreportModal } = useReportModal({ onConfirm });
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

  const { TipModal, setOpenTipModal } = useTipModal({
    onConfirm: (amount, callback) =>
      dispatch(
        post.addTip({
          saveData: {
            itemTipped: tip,
            itemTippedType: 'user',
            amount,
          },

          callback: () => {
            callback && callback();
          },
        })
      ),
  });

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
          {Boolean(tip) && (
            <MenuItem
              onClick={() => {
                setOpenTipModal(true);
                setAnchorEl(null);
              }}
            >
              Tip
            </MenuItem>
          )}
        </Menu>
      )}

      <ReportModal
        {...props}
      />
      <TipModal hideDefaultButton {...props} />
    </>
  );
};

export default ManuButton;
