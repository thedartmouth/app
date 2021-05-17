import axios from 'axios'
import { ROOT_URL } from '../../constants'

export const NOTIFICATION_ACTION_TYPES = {
	GET_SETTINGS: {
		REQUEST: 'GET_SETTINGS_REQUEST',
		SUCCESS: 'GET_SETTINGS_SUCCESS',
		FAILURE: 'GET_SETTINGS_FAILURE',
	},
	UPDATE_SETTINGS: {
		REQUEST: 'UPDATE_SETTINGS_REQUEST',
		SUCCESS: 'UPDATE_SETTINGS_SUCCESS',
		FAILURE: 'UPDATE_SETTINGS_FAILURE',
	},
}

export const getSettings = (dispatch) => async (token) => {
	dispatch({ type: NOTIFICATION_ACTION_TYPES.GET_SETTINGS.REQUEST })
	try {
		const res = await axios.get(`${ROOT_URL}/notifications/settings`, {
			params: {
				token,
			},
		})
		dispatch({
			type: NOTIFICATION_ACTION_TYPES.GET_SETTINGS.SUCCESS,
			payload: res.data,
		})
	} catch (e) {
		dispatch({
			type: NOTIFICATION_ACTION_TYPES.GET_SETTINGS.FAILURE,
			payload: e,
		})
	}
}

export const updateSetting = (dispatch) => async (tagSlug, status, token) => {
	dispatch({ type: NOTIFICATION_ACTION_TYPES.UPDATE_SETTINGS.REQUEST })
	try {
		const res = await axios.put(
			`${ROOT_URL}/notifications/settings`,
			{ [tagSlug]: status },
			{
				params: {
					token,
				},
			}
		)
		if (res.data.success && res.data.success.length === 1) {
			dispatch({
				type: NOTIFICATION_ACTION_TYPES.UPDATE_SETTINGS.SUCCESS,
				payload: { tagSlug, status },
			})
		} else {
			throw new Error(
				`Failed to update notification setting for tag with slug ${tagSlug}.`
			)
		}
	} catch (e) {
		dispatch({
			type: NOTIFICATION_ACTION_TYPES.UPDATE_SETTINGS.FAILURE,
			payload: e,
		})
	}
}
