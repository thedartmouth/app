import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { CMS_URL, ROOT_URL } from '../../constants';

export const ActionTypes = {
  AUTH_USER: {
    REQUEST: 'AUTH_USER_REQUEST',
    SUCCESS: 'AUTH_USER_SUCCESS',
    FAILURE: 'AUTH_USER_FAILURE',
  },
  GET_USER: {
    REQUEST: 'GET_USER_REQUEST',
    SUCCESS: 'GET_USER_SUCCESS',
    FAILURE: 'GET_USER_FAILURE',
  },
  SHOW_AUTH_MODAL: 'SHOW_AUTH_MODAL',
  HIDE_AUTH_MODAL: 'HIDE_AUTH_MODAL'
};

export const showAuthModal = (dispatch) => () => dispatch({
  type: ActionTypes.SHOW_AUTH_MODAL
})

export const hideAuthModal = (dispatch) => () => dispatch({
  type: ActionTypes.HIDE_AUTH_MODAL
})

export const getUser = (dispatch) => (id, token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  dispatch({type: ActionTypes.GET_USER.REQUEST});
  axios.get(`${ROOT_URL}/users/${id}`).then((response) => {
    dispatch({ type: ActionTypes.GET_USER.SUCCESS, payload: response.data });
  });
};

// gives user to reducer, which should save the user to state
export const auth = (dispatch) => (email, password) => {
  dispatch({ type: ActionTypes.AUTH_USER.REQUEST });
  axios.post(`${ROOT_URL}/users/auth`, { email, password })
    .then((response) => {
      Promise.all([SecureStore.setItemAsync('token', response.data.token), SecureStore.setItemAsync('userId', response.data.userId)])
        .then(() => {
          dispatch({ type: ActionTypes.AUTH_USER.SUCCESS });
        });
    });
};

// gives user to reducer also
export const signUp = ({firstName, lastName}, email, password) => (dispatch) => {
  axios.post(`${ROOT_URL}/auth/signup`, {
    email,
    password,
    firstName,
    lastName,
  }).then((response) => {
    if (response.message == null) {
      Promise.all([SecureStore.setItemAsync('token', response.data.token), SecureStore.setItemAsync('userName', response.data.user.name)])
        .then(() => {
          dispatch({ type: ActionTypes.GET_USER.SUCCESS, payload: response.data.user });
        });
    }
  }); // TODO: do something about receiving the message about already having an email used. then, if not, send user object to reducer
};
