import { ActionTypes } from '../actions';

const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
