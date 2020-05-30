import Colors from './Colors';
import Layout from './Layout';
import Typography from './Typography';

const CMS_URL = 'https://www.thedartmouth.com';

export const CMSImageUrl = (imageUUID, extension) => {
  return `https://snworksceo.imgix.net/drt/${imageUUID}.sized-1000x1000.${extension}`;
}

export { Colors, Layout, Typography, CMS_URL }