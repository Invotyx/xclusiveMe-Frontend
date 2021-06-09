import Image from 'next/image';
import NextLink from 'next/link';

export default function Comp({ link }) {
  return (
    <NextLink href={link || '/'} passHref>
      <a>
        <Image width={50} height={50} src='/logo.svg' alt='Logo' />
      </a>
    </NextLink>
  );
}
