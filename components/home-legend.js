import Image from 'next/image';
import Box from '@material-ui/core/Box';

export default function Comp() {
  return (
    <Box p={8}>
      <Image width={500} height={500} src='/lead-image.png' alt='Lead Image' />
    </Box>
  );
}
