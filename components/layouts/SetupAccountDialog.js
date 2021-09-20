import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import NormalCaseButton from '../NormalCaseButton';
import StripeElements from '../settings/payment/StripeElements';
import SubscriptionForm from '../settings/subscription/SubscriptionForm';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ChangeProfileImage from '../profile/change-profile-image';
import UpdateCoverImage from '../profile/update-cover-image-2';
import { useSelector } from 'react-redux';
import {
  currentUserSelector,
  uploadingCoverSelector,
  uploadingProfileImageSelector,
} from '../../selectors/authSelector';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import { getImage } from '../../services/getImage';
import CircularProgress from '@mui/material/CircularProgress';
import AgeRestrictionListItem from '../settings/account/AgeRestrictionListItem';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function getSteps() {
  return ['Setup Profile', 'Setup Fee', 'Payment Info'];
}

export default function SetupAccountDialog({ buttonProps, ...props }) {
  const uploadCoverInputRef = React.useRef(null);
  const uploadProfileImageInputRef = React.useRef(null);
  const currentUser = useSelector(currentUserSelector);
  const uploadingCover = useSelector(uploadingCoverSelector);
  const uploadingProfileImage = useSelector(uploadingProfileImageSelector);
  const subscriptionFormSubmitButton = React.useRef();
  const checkoutFormSubmitButton = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const nextStep = () => {
    setActiveStep(s => s + 1);
  };

  const handleContinue = () => {
    if (activeStep === 1) {
      subscriptionFormSubmitButton.current.click();
    } else if (activeStep === 2) {
      checkoutFormSubmitButton.current.click();
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} {...buttonProps}>
        Open
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Lets help you set up your Profile
        </DialogTitle>

        <DialogContent dividers>
          <Box px={4}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              style={{ backgroundColor: 'transparent' }}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <div>
                <Grid container>
                  <Grid item xs={12}>
                    <Card>
                      <CardActionArea
                        onClick={() => uploadCoverInputRef.current.click()}
                      >
                        <CardHeader
                          title={currentUser?.fullName}
                          avatar={
                            uploadingProfileImage ? (
                              <CircularProgress />
                            ) : (
                              <ProfileImageAvatar
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  uploadProfileImageInputRef.current.click();
                                }}
                                user={currentUser}
                              />
                            )
                          }
                          style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: currentUser?.coverImage
                              ? `${
                                  uploadingCover ? 'url("/loading.gif"), ' : ''
                                }url(${getImage(currentUser?.coverImage)})`
                              : `url('/cover2.jpg')`,
                            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
                          }}
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mt={6} mb={6} textAlign='center'>
                      <Typography variant='subtitle2' gutterBottom>
                        Upload Cover Image
                      </Typography>
                      <UpdateCoverImage
                        inputRef={uploadCoverInputRef}
                        buttonProps={{ variant: 'outlined', size: 'small' }}
                      >
                        Select Image
                      </UpdateCoverImage>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      mt={6}
                      mb={6}
                      textAlign='center'
                      style={{ borderLeft: '1px dashed #999' }}
                    >
                      <Typography variant='subtitle2' gutterBottom>
                        Upload Profile Image
                      </Typography>
                      <ChangeProfileImage
                        inputRef={uploadProfileImageInputRef}
                        buttonProps={{ variant: 'outlined', size: 'small' }}
                      >
                        Select Image
                      </ChangeProfileImage>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <List
                      style={{ padding: '0px 100px', marginBottom: '10px' }}
                    >
                      <AgeRestrictionListItem />
                    </List>
                  </Grid>
                </Grid>

                <NormalCaseButton
                  onClick={nextStep}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Next
                </NormalCaseButton>
                <NormalCaseButton onClick={nextStep} fullWidth>
                  Skip for now
                </NormalCaseButton>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <Typography variant='subtitle2'>
                  Add a subscription fee
                </Typography>

                <SubscriptionForm
                  fieldOnly
                  callbackAdditional={nextStep}
                  buttonProps={{
                    ref: subscriptionFormSubmitButton,
                    style: {
                      width: 0,
                      height: 0,
                      padding: 0,
                      border: 0,
                      textIndent: '-9999px',
                    },
                  }}
                />

                <NormalCaseButton
                  onClick={handleContinue}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Next
                </NormalCaseButton>
                <NormalCaseButton onClick={nextStep} fullWidth>
                  Skip for now
                </NormalCaseButton>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <Typography variant='subtitle2'>
                  Add your Bank Card details
                </Typography>
                <StripeElements
                  callback={() => {
                    nextStep();
                  }}
                  buttonProps={{
                    ref: checkoutFormSubmitButton,
                    style: {
                      width: 0,
                      height: 0,
                      padding: 0,
                      border: 0,
                      textIndent: '-9999px',
                    },
                  }}
                />

                <NormalCaseButton
                  onClick={handleContinue}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Next
                </NormalCaseButton>
                <NormalCaseButton onClick={nextStep} fullWidth>
                  Skip for now
                </NormalCaseButton>
              </div>
            )}

            {activeStep === 3 && (
              <Box textAlign='center' p={6} pb={8}>
                <BeenhereIcon style={{ fontSize: '3rem' }} />
                <Typography variant='h6' gutterBottom>
                  All Set!
                </Typography>
                <NormalCaseButton
                  onClick={handleClose}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Close
                </NormalCaseButton>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
