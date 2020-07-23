import { ActionTypes } from '../actions';

const INITIAL_STATE = {
  current: {},
  feed: [],
  page: 1,
  bookmarkedArticles: [],
};

const articleReducer = (state = INITIAL_STATE, action) => {
  const prevState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.REFRESH_FEED.SUCCESS:
      return { ...prevState, feed: action.payload };
    case ActionTypes.ADD_FEED:
      return { ...prevState, feed: [...prevState.feed, ...action.payload] };
    case ActionTypes.READ_ARTICLE:
      return { ...prevState, current: action.payload };
    case ActionTypes.LEAVE_ARTICLE:
      return { ...prevState, current: {} };
    case ActionTypes.BOOKMARK_ARTICLE:
      return { ...prevState, bookmarkedArticles: action.payload };
    case ActionTypes.GET_USER:
      return { ...prevState, bookmarkedArticles: action.payload.bookmarkedArticles };
    default:
      return state;
  }
};

export default articleReducer;
