import { ActionTypes } from '../actions';

const INITIAL_STATE = {
  feed: [],
  discovered: [],
  totalDiscovered: 0,
  page: 1,
  bookmarkedArticles: [],
};

const articleReducer = (state = INITIAL_STATE, action) => {
  const prevState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.SEARCH_ARTICLES.REQUEST:
      return { ...prevState, discovered: null };
    case ActionTypes.SEARCH_ARTICLES.SUCCESS:
      return { ...prevState, discovered: action.payload.discovered, totalDiscovered: action.payload.total };
    case ActionTypes.REFRESH_FEED.REQUEST:
      return { ...prevState, feed: null };
    case ActionTypes.REFRESH_FEED.SUCCESS:
      return { ...prevState, feed: action.payload };
    case ActionTypes.ADD_FEED:
      return { ...prevState, feed: [...prevState.feed, ...action.payload] };
    case ActionTypes.BOOKMARK_ARTICLE:
      return { ...prevState, bookmarks: action.payload };
    case ActionTypes.GET_BOOKMARKS:
      return { ...prevState, bookmarks: action.payload };
    default:
      return state;
  }
};

export default articleReducer;
