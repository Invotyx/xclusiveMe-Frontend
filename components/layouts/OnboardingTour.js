import Joyride from 'react-joyride';
import React from 'react';
import { useRouter } from 'next/router';

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

const steps = [
  {
    content: <h2>Let's begin our journey!</h2>,
    placement: 'center',
    target: 'body',
  },
  {
    target: '.step-1',
    content: 'Your newsfeed appears here',
    placement: 'right-start',
  },
  {
    target: '.step-2',
    content: 'Ready for you first masterpiece',
  },
  {
    target: '.step-3',
    content: 'Search your friends and Family',
  },
  {
    target: '.step-4',
    content: 'All your settings here',
  },
  {
    target: '.step-5',
    content: 'Check out your notifications here',
  },
  {
    target: '.step-6',
    content: 'Chat with your Followers!',
  },
  {
    content: 'Lets get you set up',
    placement: 'center',
    target: 'body',
  },
];

export default function OnboardingTour() {
  const router = useRouter();
  const { pathname } = router;
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
      //
    }
  };
  return (
    <>
      {pathname === '/explore' && startTour && !startTourSkipped && (
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          showSkipButton
          styles={styles}
          steps={steps}
        />
      )}
    </>
  );
}
