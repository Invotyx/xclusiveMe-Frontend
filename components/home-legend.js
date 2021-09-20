import Image from 'next/image';
import Box from '@mui/material/Box';

export default function HomeLegend() {
  return (
    <Box pt={8} pl={8} pr={8} mt='-50px'>
      <Image width={420} height={420} src='/lead-image.png' alt='Lead Image' />
    </Box>
  );
}
