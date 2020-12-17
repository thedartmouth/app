import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { CMS_URL, ROOT_URL } from '../../constants'

export const ActionTypes = {
	AUTH_USER: {
		REQUEST: 'AUTH_USER_REQUEST',
		SUCCESS: 'AUTH_USER_SUCCESS',
		FAILURE: 'AUTH_USER_FAILURE',
	},
	DEAUTH_USER: 'DEAUTH_USER',
	GET_USER: {
		REQUEST: 'GET_USER_REQUEST',
		SUCCESS: 'GET_USER_SUCCESS',
		FAILURE: 'GET_USER_FAILURE',
	},
	SHOW_AUTH_MODAL: 'SHOW_AUTH_MODAL',
	HIDE_AUTH_MODAL: 'HIDE_AUTH_MODAL',
}

export const showAuthModal = (dispatch) => () =>
	dispatch({
		type: ActionTypes.SHOW_AUTH_MODAL,
	})

export const hideAuthModal = (dispatch) => () =>
	dispatch({
		type: ActionTypes.HIDE_AUTH_MODAL,
	})

export const getUser = (dispatch) => async () => {
	dispatch({ type: ActionTypes.GET_USER.REQUEST })
	const response = await axios.get(
		`${ROOT_URL}/users/${await SecureStore.getItemAsync('userId')}`
	)
	dispatch({ type: ActionTypes.GET_USER.SUCCESS, payload: response.data })
}

// gives user to reducer, which should save the user to state
export const signIn = (dispatch) => async (email, password) => {
	dispatch({ type: ActionTypes.AUTH_USER.REQUEST })
	const response = await axios.post(`${ROOT_URL}/users/auth`, {
		email,
		password,
	})
	// axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
	await Promise.all([
		SecureStore.setItemAsync('token', response.data.token),
		SecureStore.setItemAsync('userId', response.data.userId),
	])
	auth(dispatch)(response.data.token)
	await getUser(dispatch)()
}

export const auth = (dispatch) => (token) => {
	dispatch({ type: ActionTypes.AUTH_USER.SUCCESS })
	axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const deAuth = (dispatch) => () => {
	dispatch({ type: ActionTypes.DEAUTH_USER })
	axios.defaults.headers.common.Authorization = null
	SecureStore.deleteItemAsync('token')
	SecureStore.deleteItemAsync('userId')
}

// gives user to reducer also
export const signUp = (dispatch) => async (name, email, password) => {
	dispatch({ type: ActionTypes.AUTH_USER.REQUEST })
	const response = await axios.post(`${ROOT_URL}/users`, {
		email,
		password,
		name,
	})
	// axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
	await Promise.all([
		SecureStore.setItemAsync('token', response.data.token),
		SecureStore.setItemAsync('userId', response.data.userId),
	])
	auth(dispatch)(response.data.token)
	await getUser(dispatch)()
}
