import * as articleActions from './article-actions'
import * as userActions from './user-actions'

export const ActionTypes = {
	...articleActions.ActionTypes,
	...userActions.ActionTypes,
}

export default { ...articleActions, ...userActions }
