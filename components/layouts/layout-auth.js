import LogoAuth from './logo-auth';
import BottomNav from './bottom-nav';
import Box from '@material-ui/core/Box';

export default function Layout(props) {
  const { children, hideMainAppBar, ...other } = props;
  return (
    <>
      <Box
        display={
          hideMainAppBar ? { xs: 'none', sm: 'none', md: 'flex' } : 'block'
        }
      >
        <LogoAuth {...other} />
      </Box>
      <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }}>
        {hideMainAppBar}
      </Box>
      {children}
      <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }}>
        <BottomNav />
      </Box>
    </>
  );
}
