import Colors from './Colors'
import Layout from './Layout'
import Typography from './Typography'

const DEPLOY_TAG = 'prod'

const CMS_URL = 'https://www.thedartmouth.com'
const ROOT_URL =
	DEPLOY_TAG === 'prod'
		? 'https://the-dartmouth-core-staging.herokuapp.com'
		: 'https://the-dartmouth-core-prod.herokuapp.com'
const POLICY_URL = 'https://www.thedartmouth.com/page/policies'

const wait = (timeout) =>
	new Promise((resolve) => {
		setTimeout(resolve, timeout)
	})

const SECTIONS = ['covid', 'news', 'opinion', 'sports', 'arts', 'mirror']

export {
	Colors,
	Layout,
	Typography,
	CMS_URL,
	SECTIONS,
	wait,
	ROOT_URL,
	POLICY_URL,
}
