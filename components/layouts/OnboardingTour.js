import Joyride from 'react-joyride';
import React from 'react';
import CurvedArrow from 'react-curved-arrow';
import Typography from '@material-ui/core/Typography';

const styles = {
  options: {
    arrowColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
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

export const steps = [
  {
    target: '.step-1',
    content: (
      <>
        <div className='tour-arrow' style={{ position: 'relative' }}>
          <CurvedArrow
            color='#999'
            fromSelector='.step-1'
            toSelector='.step-1'
            fromOffsetX={-100}
            fromOffsetY={100}
            middleY={40}
          />
        </div>
        <Typography style={{ fontWeight: 400 }}>
          Your newsfeed appears here
        </Typography>
      </>
    ),
    placement: 'right-start',
    floaterProps,
    hideCloseButton: true,
    hideBackButton: true,
    disableBeacon: true,
  },
  {
    target: '.step-2',
    content: (
      <>
        <div className='tour-arrow' style={{ position: 'relative' }}>
          <CurvedArrow
            color='#999'
            fromSelector='.step-2'
            toSelector='.step-2'
            fromOffsetX={100}
            fromOffsetY={100}
            middleY={40}
          />
        </div>
        <Typography style={{ fontWeight: 400 }}>
          Ready for you first masterpiece
        </Typography>
      </>
    ),
    floaterProps,
    hideCloseButton: true,
    hideBackButton: true,
    disableBeacon: true,
  },
  {
    target: '.step-3',
    content: (
      <>
        <div className='tour-arrow' style={{ position: 'relative' }}>
          <CurvedArrow
            color='#999'
            fromSelector='.step-3'
            toSelector='.step-3'
            fromOffsetX={100}
            fromOffsetY={100}
            middleY={40}
          />
        </div>
        <Typography style={{ fontWeight: 400 }}>
          Search your friends and Family
        </Typography>
      </>
    ),
    floaterProps,
    hideCloseButton: true,
    hideBackButton: true,
    disableBeacon: true,
  },
  {
    target: '.step-4',
    content: (
      <>
        <div className='tour-arrow' style={{ position: 'relative' }}>
          <CurvedArrow
            color='#999'
            fromSelector='.step-4'
            toSelector='.step-4'
            fromOffsetX={100}
            fromOffsetY={100}
            middleY={40}
          />
        </div>
        <Typography style={{ fontWeight: 400 }}>
          All your settings here
        </Typography>
      </>
    ),
    floaterProps,
    hideCloseButton: true,
    hideBackButton: true,
    disableBeacon: true,
  },
  {
    target: '.step-5',
    content: (
      <>
        <div className='tour-arrow' style={{ position: 'relative' }}>
          <CurvedArrow
            color='#999'
            fromSelector='.step-5'
            toSelector='.step-5'
            fromOffsetX={100}
            fromOffsetY={100}
            middleY={40}
          />
        </div>
        <Typography style={{ fontWeight: 400 }}>
          Check out your notifications here
        </Typography>
      </>
    ),
    floaterProps,
    hideCloseButton: true,
    hideBackButton: true,
    disableBeacon: true,
  },
  {
    target: '.step-6',
    content: (
      <>
        <div className='tour-arrow' style={{ position: 'relative' }}>
          <CurvedArrow
            color='#999'
            fromSelector='.step-6'
            toSelector='.step-6'
            fromOffsetX={100}
            fromOffsetY={100}
            middleY={40}
          />
        </div>
        <Typography style={{ fontWeight: 400 }}>
          Chat with your Followers!
        </Typography>
      </>
    ),
    floaterProps,
    hideCloseButton: true,
    hideBackButton: true,
    disableBeacon: true,
  },
];

export default function OnboardingTour({ startTour, getHelpers }) {
  return (
    <>
      {startTour && (
          <Joyride
            continuous
            disableScrolling
            styles={styles}
            steps={steps}
            getHelpers={getHelpers}
          />
        )}
    </>
  );
}
