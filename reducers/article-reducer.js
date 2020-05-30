import { ActionTypes } from "../actions";

const INITIAL_STATE = {
  current: null,
  feed: [],
};

export default articleReducer = (state = INITIAL_STATE, action) => {
  prevState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.REFRESH_FEED.SUCCESS:
      return {...prevState, feed: action.payload};
    default:
      return state
  }
};