import { ActionTypes } from '../actions'

const INITIAL_STATE = {
	data: null,
	loadingData: false,
	lastAuth: null,
	loadingAuth: false,
	showAuthModal: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.GET_USER.REQUEST:
			return { ...state, loadingData: true, data: action.payload }
		case ActionTypes.GET_USER.SUCCESS:
			return { ...state, loadingData: false, data: action.payload }
		case ActionTypes.AUTH_USER.REQUEST:
			return { ...state, loadingAuth: true }
		case ActionTypes.AUTH_USER.SUCCESS:
			return { ...state, loadingAuth: false, lastAuth: new Date() }
		case ActionTypes.AUTH_USER.FAILURE:
			return { ...state, loadingAuth: false }
		case ActionTypes.DEAUTH_USER:
			return { ...state, lastAuth: null, data: null }
		case ActionTypes.SHOW_AUTH_MODAL:
			return { ...state, showAuthModal: true }
		case ActionTypes.HIDE_AUTH_MODAL:
			return { ...state, showAuthModal: false }
		default:
			return state
	}
}

export default userReducer
