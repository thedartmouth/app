import Colors from './Colors';
import Layout from './Layout';
import Typography from './Typography';

const CMS_URL = 'https://www.thedartmouth.com';
const ROOT_URL = process?.env?.DEPLOY_TAG === 'DEV' ? 'http://192.168.0.101:9090' : 'https://the-dartmouth-core-prod.herokuapp.com';

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
