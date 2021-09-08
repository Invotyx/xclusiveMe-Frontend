import Joyride from 'react-joyride';
import React from 'react';

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
    zIndex: 100,
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
  const [startTour, setStartTour] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setStartTour(true), 5000);
  }, []);
  const handleJoyrideCallback = data => {
  };
  return (
    <>
      {startTour && (
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
