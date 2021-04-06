import Image from 'next/image';
import Box from '@material-ui/core/Box';

export default function Comp() {
  return (
    <Box p={8}>
      <Image width={50} height={50} src='/logo.png' alt='Logo' />
    </Box>
  );
}
