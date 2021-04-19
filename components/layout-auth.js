import LogoAuth from '../components/logo-auth';
import BottomNav from '../components/bottom-nav';

export default function Layout(props) {
  const { children, ...other } = props;
  return (
    <>
      <LogoAuth {...other} />
      {children}
        <BottomNav />
    </>
  );
}
