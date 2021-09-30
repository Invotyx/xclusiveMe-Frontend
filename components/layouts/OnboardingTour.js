import Joyride from 'react-joyride';
import React from 'react';
import { useRouter } from 'next/router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SetupAccountDialog from './SetupAccountDialog';

const styles = {
  options: {
    arrowColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    beaconSize: 36,
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    primaryColor: '#fff',
    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    textColor: '#fff',
    width: undefined,
    zIndex: 10000,
  },
};

const floaterProps = {
  styles: {
    arrow: {
      length: 0,
      spread: 0,
    },
  },
};

const steps = [
  {
    content: <h2>Let's begin our journey!</h2>,
    placement: 'center',
    target: 'body',
    floaterProps,
    hideCloseButton: true,
  },
  {
    target: '.step-1',
    content: <h2>Your newsfeed appears here</h2>,
    placement: 'right-start',
    floaterProps,
    hideCloseButton: true,
  },
  {
    target: '.step-2',
    content: <h2>Ready for you first masterpiece</h2>,
    floaterProps,
    hideCloseButton: true,
  },
  {
    target: '.step-3',
    content: <h2>Search your friends and Family</h2>,
    floaterProps,
    hideCloseButton: true,
  },
  {
    target: '.step-4',
    content: <h2>All your settings here</h2>,
    floaterProps,
    hideCloseButton: true,
  },
  {
    target: '.step-5',
    content: <h2>Check out your notifications here</h2>,
    floaterProps,
    hideCloseButton: true,
  },
  {
    target: '.step-6',
    content: <h2>Chat with your Followers!</h2>,
    floaterProps,
    hideCloseButton: true,
  },
  {
    content: <h2>Lets get you set up</h2>,
    placement: 'center',
    target: 'body',
    floaterProps,
    hideCloseButton: true,
  },
];

export default function OnboardingTour() {
  const setupAccountDialogButton = React.useRef();
  const router = useRouter();
  const { pathname } = router;
  const isMediumAndUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const [startTour, setStartTour] = React.useState(false);
  const [startTourSkipped, setStartTourSkipped] = React.useState(false);
  React.useEffect(() => {
    setStartTourSkipped(Boolean(localStorage.getItem('OnboardingTourSkipped')));
    setTimeout(() => setStartTour(true), 5000);
  }, []);
  const handleJoyrideCallback = data => {
    const { action, index, status, type } = data;
    if (action === 'skip') {
      localStorage.setItem('OnboardingTourSkipped', 1);
    }
    if (
      action === 'next' &&
      index === 7 &&
      status === 'finished' &&
      type === 'tour:end'
    ) {
      localStorage.setItem('OnboardingTourSkipped', 1);
      //
      setupAccountDialogButton.current.click();
    }
  };
  return (
    <>
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
      {pathname === '/explore' &&
        isMediumAndUp &&
        startTour &&
        !startTourSkipped && (
          <Joyride
            callback={handleJoyrideCallback}
            continuous
            showSkipButton
            styles={styles}
            steps={steps}
            locale={{
              last: 'Setup your account',
            }}
          />
        )}
    </>
  );
}
