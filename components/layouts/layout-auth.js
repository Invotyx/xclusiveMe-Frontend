import LogoAuth from './logo-auth';
import BottomNav from './bottom-nav';
import Box from '@material-ui/core/Box';
import OnboardingTour from './OnboardingTour';

export default function Layout({ children, hideMainAppBar, ...props }) {
  return (
    <>
      <Box
        display={
          hideMainAppBar ? { xs: 'none', sm: 'none', md: 'flex' } : 'block'
        }
      >
        <LogoAuth {...props} />
      </Box>
      <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }}>
        {hideMainAppBar}
      </Box>
      {children}
      <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }}>
        <BottomNav />
      </Box>
      <OnboardingTour />
    </>
  );
}
