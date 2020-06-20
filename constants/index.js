import Colors from './Colors';
import Layout from './Layout';
import Typography from './Typography';

const CMS_URL = 'https://www.thedartmouth.com';

export const CMSImageUrl = (imageUUID, extension) => {
  return `https://snworksceo.imgix.net/drt/${imageUUID}.sized-1000x1000.${extension}`;
}

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const SECTIONS = [
  'covid',
  'news',
  'opinion',
  'sports',
  'arts',
  'mirror',
];

export { Colors, Layout, Typography, CMS_URL, SECTIONS, wait }