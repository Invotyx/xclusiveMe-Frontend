import LogoAuth from '../components/logo-auth';

export default function Layout({ children }) {
  return (
    <>
      <LogoAuth />
      {children}
    </>
  );
}
