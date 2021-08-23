import { IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import ReportModal from './profile/ReportModal';

const ManuButton = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReportModal, setreportModal] = useState(false);

  const handleOpenmenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenReportModal = () => {
    setAnchorEl(null);
    setreportModal(true);
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

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenReportModal}>Report</MenuItem>
      </Menu>

      <ReportModal
        openReportModal={openReportModal}
        setreportModal={setreportModal}
        post={post}
      />
    </>
  );
};

export default ManuButton;
