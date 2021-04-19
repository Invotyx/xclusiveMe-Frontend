import LogoAuth from '../components/logo-auth';
import BottomNav from '../components/bottom-nav';
import Box from '@material-ui/core/Box';

export default function Layout(props) {
  const { children, ...other } = props;
  return (
    <>
      <LogoAuth {...other} />
      {children}
      <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }}>
        <BottomNav />
      </Box>
    </>
  );
}
