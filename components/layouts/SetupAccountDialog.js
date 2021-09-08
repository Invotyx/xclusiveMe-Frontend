import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import GreenButton from '../GreenButton';
import NormalCaseButton from '../NormalCaseButton';
import StripeElements from '../settings/payment/StripeElements';
import SubscriptionForm from '../settings/subscription/SubscriptionForm';
import BeenhereIcon from '@material-ui/icons/Beenhere';

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
        >
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
  const subscriptionFormSubmitButton = React.useRef();
  const checkoutFormSubmitButton = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleContinue = () => {
    if (activeStep === 0) {
      subscriptionFormSubmitButton.current.click();
    } else if (activeStep === 1) {
      checkoutFormSubmitButton.current.click();
    }
    setActiveStep(s => s + 1);
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
                <Typography variant='subtitle2'>
                  Add a subscription fee
                </Typography>

                <SubscriptionForm
                  fieldOnly
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

                <GreenButton
                  onClick={handleContinue}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Next
                </GreenButton>
                <NormalCaseButton onClick={handleClose} fullWidth>
                  Skip for now
                </NormalCaseButton>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <Typography variant='subtitle2'>
                  Add your Bank Card details
                </Typography>
                <StripeElements
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

                <GreenButton
                  onClick={handleContinue}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Continue
                </GreenButton>
                <NormalCaseButton onClick={handleClose} fullWidth>
                  handleClose
                </NormalCaseButton>
              </div>
            )}

            {activeStep === 2 && (
              <Box textAlign='center' p={6} pb={8}>
                <BeenhereIcon style={{ fontSize: '3rem' }} />
                <Typography variant='h6'>All Set!</Typography>
                <GreenButton
                  onClick={handleClose}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Close
                </GreenButton>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
