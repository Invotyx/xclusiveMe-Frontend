import Image from 'next/image';
import Link from 'next/link';
import Box from '@material-ui/core/Box';

export default function Comp() {
  return (
    <Box p={8}>
      <Link href='/'>
        <Image width={50} height={50} src='/logo.png' alt='Logo' />
      </Link>
    </Box>
  );
}
