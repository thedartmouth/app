import * as articleActions from './article-actions'
import * as userActions from './user-actions'
import * as notificationActions from './notification-actions'

export const ActionTypes = {
	...articleActions.ActionTypes,
	...userActions.ActionTypes,
	...notificationActions.NOTIFICATION_ACTION_TYPES,
}

export default { ...articleActions, ...userActions, ...notificationActions }
