import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export const getImage = (img) =>
  `${SERVER_ADDRESS.substring(0, SERVER_ADDRESS.length - 4)}/${img}`;
