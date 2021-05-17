import { combineReducers } from 'redux'
import articleReducer from './article-reducer'
import userReducer from './user-reducer'
import notificationReducer from './notification-reducer'

export default combineReducers({
	articles: articleReducer,
	user: userReducer,
	notification: notificationReducer,
})
