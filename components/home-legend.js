import Image from 'next/image';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function HomeLegend() {
  const isMobile = useMediaQuery('(max-width: 760px)');
  return (
    <Box pt={isMobile ? 16 : 8} pl={8} pr={isMobile ? 2 : 8} mt='-20px'>
      <Image width={550} height={480} src='/lead-image.png' alt='Lead Image' />
    </Box>
  );
}
