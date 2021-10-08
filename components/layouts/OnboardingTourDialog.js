import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import NormalCaseButton from '../NormalCaseButton';
import OnboardingTour, { steps } from './OnboardingTour';
import SetupAccountDialog from './SetupAccountDialog';

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paper': {
      background: 'transparent',
    },
    textAlign: 'center',
  },
});

export default function SimpleDialogDemo() {
  const router = useRouter();
  const { pathname } = router;
  const isMediumAndUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const [startTour, setStartTour] = React.useState(false);
  const [startTourSkipped, setStartTourSkipped] = React.useState(false);
  React.useEffect(() => {
    setStartTourSkipped(Boolean(localStorage.getItem('OnboardingTourSkipped')));
    setTimeout(() => setStartTour(true), 5000);
  }, []);
  const open =
    pathname === '/explore' && isMediumAndUp && startTour && !startTourSkipped;

  const handleClose = () => {
    localStorage.setItem('OnboardingTourSkipped', 1);
    setStartTour(false);
  };

  return <SimpleDialog open={open} onClose={handleClose} />;
}

function SimpleDialog(props) {
  const setupAccountDialogButton = React.useRef();
  const stepsLength = steps.length;
  const classes = useStyles();
  const { onClose, open } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const [helpers, setHelpers] = React.useState(null);
  function getHelpers(a) {
    setHelpers(a);
  }
  const currentUser = useSelector(currentUserSelector);

  const handleClose = () => {
    onClose();
    if (helpers) {
      const { skip } = helpers;
      skip();
    }
  };

  const handleClick = () => {
    if (activeStep > stepsLength) {
      setupAccountDialogButton.current.click();
      handleClose();
      return;
    }
    setActiveStep(i => i + 1);
  };

  React.useEffect(() => {
    if (activeStep > 1) {
      const { next } = helpers;
      next();
    }
  }, [activeStep]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        className={classes.dialog}
        PaperProps={{ elevation: 0 }}
        fullScreen
      >
        <DialogContent
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography gutterBottom>
            Welcome, {currentUser?.fullName}!
          </Typography>
          <Typography gutterBottom>Let’s get you set up</Typography>
          <NormalCaseButton
            variant='outlined'
            style={{
              borderRadius: '20px',
              minWidth: '100px',
              marginTop: '4px',
            }}
            onClick={handleClick}
          >
            {activeStep === 0
              ? 'Start'
              : activeStep > stepsLength
              ? 'Set up your Account'
              : 'Next'}
          </NormalCaseButton>
          <NormalCaseButton
            style={{ color: '#666', position: 'fixed', bottom: '50px' }}
            onClick={handleClose}
          >
            Skip for now
          </NormalCaseButton>
        </DialogContent>
      </Dialog>
      <SetupAccountDialog
        buttonProps={{
          ref: setupAccountDialogButton,
          style: {
            width: 0,
            height: 0,
            padding: 0,
            border: 0,
            textIndent: '-9999px',
          },
        }}
      />
      <OnboardingTour
        startTour={activeStep > 0 && activeStep < 10}
        getHelpers={getHelpers}
      />
    </>
  );
}
