import Image from 'next/image';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';

export default function Comp() {
  return (
    <Box p={8}>
      <NextLink href='/'>
        <Image width={50} height={50} src='/logo.svg' alt='Logo' />
      </NextLink>
    </Box>
  );
}
