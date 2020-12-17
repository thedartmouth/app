import { ActionTypes } from '../actions'

const INITIAL_STATE = {
	feed: [],
	results: [],
	totalResults: 0,
	loadingResults: false,
	current: null,
	loadingCurrent: false,
	pendingBookmarks: [],
}

const articleReducer = (state = INITIAL_STATE, action) => {
	const prevState = JSON.parse(JSON.stringify(state))
	switch (action.type) {
		case ActionTypes.DISCOVER_ARTICLES_BY_TAG.REQUEST:
			return {
				...prevState,
				loadingResults: true,
				results: action.reset ? [] : prevState.results,
				totalResults: action.reset ? 0 : prevState.totalResults,
			}
		case ActionTypes.DISCOVER_ARTICLES_BY_TAG.SUCCESS:
			return {
				...prevState,
				loadingResults: false,
				results: [...prevState.results, ...action.payload.results],
				totalResults: prevState.totalResults + action.payload.total,
			}
		case ActionTypes.SEARCH_ARTICLES.REQUEST:
			return {
				...prevState,
				loadingResults: true,
				results: action.reset ? [] : prevState.results,
				totalResults: action.reset ? 0 : prevState.totalResults,
			}
		case ActionTypes.SEARCH_ARTICLES.SUCCESS:
			return {
				...prevState,
				loadingResults: false,
				results: [...prevState.results, ...action.payload.results],
				totalResults: prevState.totalResults + action.payload.total,
			}
		case ActionTypes.REFRESH_FEED.REQUEST:
			return { ...prevState, feed: null }
		case ActionTypes.REFRESH_FEED.SUCCESS:
			return { ...prevState, feed: action.payload }
		case ActionTypes.ADD_FEED:
			return { ...prevState, feed: [...prevState.feed, ...action.payload] }
		case ActionTypes.READ_ARTICLE.REQUEST:
			return { ...prevState, loadingCurrent: true, current: action.payload }
		case ActionTypes.READ_ARTICLE.SUCCESS:
			return { ...prevState, loadingCurrent: false, current: action.payload }
		case ActionTypes.EXIT_ARTICLE:
			return { ...prevState, current: null }
		case ActionTypes.BOOKMARK_ARTICLE.REQUEST:
			return {
				...prevState,
				pendingBookmarks: [...prevState.pendingBookmarks, action.payload],
			}
		case ActionTypes.BOOKMARK_ARTICLE.SUCCESS_ADD:
			return {
				...prevState,
				pendingBookmarks: prevState.pendingBookmarks.filter(
					(article) => article !== action.payload
				),
				current: { ...prevState.current, bookmarked: true },
			}
		case ActionTypes.BOOKMARK_ARTICLE.SUCCESS_DELETE:
			return {
				...prevState,
				pendingBookmarks: prevState.pendingBookmarks.filter(
					(article) => article !== action.payload
				),
				current: { ...prevState.current, bookmarked: false },
			}
		case ActionTypes.BOOKMARK_ARTICLE.FAILURE:
			return {
				...prevState,
				pendingBookmarks: prevState.pendingBookmarks.filter(
					(article) => article !== action.payload
				),
			}
		case ActionTypes.GET_BOOKMARKS.REQUEST:
			return { ...prevState, loadingResults: true }
		case ActionTypes.GET_BOOKMARKS.SUCCESS:
			return {
				...prevState,
				loadingResults: false,
				results: action.payload.results,
				totalResults: action.payload.total,
			}
		case ActionTypes.GET_BOOKMARKS.FAILURE:
			return { ...prevState, loadingResults: false }
		default:
			return state
	}
}

export default articleReducer
