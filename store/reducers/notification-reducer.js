import { ActionTypes } from '../actions'

const INITIAL_STATE = {
	settings: null,
	loadingSettings: false,
}

const notificationReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.GET_SETTINGS.REQUEST:
			return { ...state, loadingSettings: true, settings: null }
		case ActionTypes.GET_SETTINGS.SUCCESS:
			return { ...state, loadingSettings: false, settings: action.payload }
		case ActionTypes.GET_SETTINGS.FAILURE:
			console.error(action.payload)
			return { ...state, loadingSettings: false, settings: null }
		case ActionTypes.UPDATE_SETTINGS.SUCCESS:
			const newSettings = [...state.settings]
			newSettings.find((e) => e.slug === action.payload.tagSlug).active =
				action.payload.status
			return { ...state, loadingSettings: false, settings: newSettings }
		default:
			return state
	}
}

export default notificationReducer
