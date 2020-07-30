import axios from 'axios';
import { CMS_URL, ROOT_URL } from '../../constants';
import * as SecureStore from 'expo-secure-store';


export const ActionTypes = {
    GET_USER:'GET_USER',
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
}


export const getUser = async() => {
  return SecureStore.getItemAsync("token");
}


export const signIn = ({email, password}) => { // gives user to reducer, which should save the user to state
  return dispatch => {
    axios.post(`${ROOT_URL}/auth/signin`, {
        email: email,
        password: password,
    })
      .then(response => {
        Promise.all([SecureStore.setItemAsync("token", response.data.token)])
          .then(dispatch({type: ActionTypes.SIGN_IN, user: response.data.user}));
      });
  }
}

export const signUp = (firstName, lastName, email, password) => { // gives user to reducer also
    axios.post(`${ROOT_URL}/auth/signup`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
    }).then(response => {
        if (response.message == null) { 
          SecureStore.setItemAsync("token", response.token);
          dispatch({type: ActionTypes.SIGN_UP, user: response.user});
        }
    }) // TODO: do something about receiving the message about already having an email used. then, if not, send user object to reducer
}

