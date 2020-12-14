import Colors from './Colors';
import Layout from './Layout';
import Typography from './Typography';

const CMS_URL = 'https://www.thedartmouth.com';
const ROOT_URL = 'http://localhost:9090';

const wait = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const SECTIONS = [
  'covid',
  'news',
  'opinion',
  'sports',
  'arts',
  'mirror',
];

export {
  Colors, Layout, Typography, CMS_URL, SECTIONS, wait, ROOT_URL,
};
