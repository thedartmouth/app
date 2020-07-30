import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  user: {
  },
};

export default userReducer = (state = INITIAL_STATE, action) => {
  prevState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.GET_USER:
      return ;
    case ActionTypes.SIGN_IN:
      return Object.assign({}, state, {user: action.user});
    case ActionTypes.SIGN_UP:
      return Object.assign({}, state, {user: action.user});
    default:
      return state
  }
};