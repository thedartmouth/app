import { ActionTypes } from '../actions';

const INITIAL_STATE = {
  feed: [],
  results: [],
  totalResults: 0,
  loadingResults: false,
};

const articleReducer = (state = INITIAL_STATE, action) => {
  const prevState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ActionTypes.DISCOVER_ARTICLES_BY_TAG.REQUEST:
      return { ...prevState, loadingResults: true, results: action.reset ? [] : prevState.results, totalResults: action.reset ? 0 : prevState.totalResults };
    case ActionTypes.DISCOVER_ARTICLES_BY_TAG.SUCCESS:
      return { ...prevState, loadingResults: false, results: [...prevState.results, ...action.payload.results], totalResults: prevState.totalResults + action.payload.total };
    case ActionTypes.SEARCH_ARTICLES.REQUEST:
      return { ...prevState, loadingResults: true, results: action.reset ? [] : prevState.results, totalResults: action.reset ? 0 : prevState.totalResults };
    case ActionTypes.SEARCH_ARTICLES.SUCCESS:
      return { ...prevState, loadingResults: false, results: [...prevState.results, ...action.payload.results], totalResults: prevState.totalResults + action.payload.total };
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
