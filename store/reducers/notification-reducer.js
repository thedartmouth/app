import { ActionTypes } from '../actions'

const INITIAL_STATE = {
	settings: [
		{ active: false, slug: 'top-story', name: 'Top Story' },
		{ active: false, slug: 'top-picture', name: 'Top Picture' },
		{ active: false, slug: 'cartoon-of-the-day', name: 'Cartoon of the Day' },
		{ active: false, slug: 'featured', name: 'Featured' },
		{ active: false, slug: 'student-spotlights', name: 'Student Spotlights' },
		{ active: false, slug: 'verbum-ultimum', name: 'Verbum Ultimum' },
		{ active: false, slug: 'news', name: 'News' },
		{ active: false, slug: 'covid-19', name: 'Covid-19' },
		{ active: false, slug: 'opinion', name: 'Opinion' },
		{ active: false, slug: 'sports', name: 'Sports' },
		{ active: false, slug: 'arts', name: 'Arts' },
		{ active: false, slug: 'mirror', name: 'Mirror' },
		{ active: false, slug: 'cartoon', name: 'Cartoon' },
	],
	loadingSettings: false,
	showNotificationRequestModal: false,
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
		case ActionTypes.SHOW_NOTIFICATION_REQUEST_MODAL:
			return { ...state, showNotificationRequestModal: true }
		case ActionTypes.HIDE_NOTIFICATION_REQUEST_MODAL:
			console.log('hiding')
			return { ...state, showNotificationRequestModal: false }
		default:
			return state
	}
}

export default notificationReducer
