import LogoAuth from '../components/logo-auth';

export default function Layout(props) {
  const { children, ...other } = props;
  return (
    <>
      <LogoAuth {...other} />
      {children}
    </>
  );
}
