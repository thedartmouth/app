import { ActionTypes } from '../actions';

const INITIAL_STATE = {
  data: null,
  lastAuth: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER.SUCCESS:
      return {...state, data: action.payload, lastAuth: new Date()};
    default:
      return state;
  }
};

export default userReducer;
