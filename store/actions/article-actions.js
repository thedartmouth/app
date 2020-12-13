import axios from "axios";
import { CMS_URL, ROOT_URL } from "../../constants";

export const ActionTypes = {
  REFRESH_FEED: {
    REQUEST: "REFRESH_FEED_REQUEST",
    SUCCESS: "REFRESH_FEED_SUCCESS",
    FAILURE: "REFRESH_FEED_FAILURE",
  },
  ADD_FEED: "ADD_FEED",
  READ_ARTICLE: "READ_ARTICLE",
  // LEAVE_ARTICLE: 'LEAVE_ARTICLE',
  SET_PAGE: "SET_PAGE",
  BOOKMARK_ARTICLE: "BOOKMARK_ARTICLE",
  ERROR_SET: "ERROR_SET",
};

/**
 * Pulls the most recent set of articles from all sections on page 1 and saves to redux store.
 */
export const refreshFeed = (dispatch) => () =>
  new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.REFRESH_FEED.REQUEST });
    axios
      .get(`${CMS_URL}/search.json?a=1&ty=article&per_page=20&page=1`)
      .then((response) => {
        dispatch({
          type: ActionTypes.REFRESH_FEED.SUCCESS,
          payload: response.data.items,
        });
        resolve();
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.REFRESH_FEED.FAILURE });
        reject(error);
      });
  });

/**
 * Pulls the most recent set of articles from all sections on a given page and adds to redux store.
 * @param {Integer} page The current page to fill the newsfeed with.
 */
export const addFeed = (dispatch) => (page) =>
  new Promise((resolve) => {
    console.log(`adding page ${page} to feed`);
    axios
      .get(`${CMS_URL}/search.json?a=1&ty=article&per_page=20&page=${page}`)
      .then((response) => {
        dispatch({ type: ActionTypes.ADD_FEED, payload: response.data.items });
        resolve();
      });
  });

/**
 * Sends to backend the current article and receives an object back containing data like views.
 * @param {String} article The article to send backend (current article).
 */
export const readArticle = (article) => () => new Promise((resolve) => {
  axios.post(`${ROOT_URL}/articles/read`, article)
    .then((response) => {
      resolve(response.data);
    });
  });

// /**
//  * Clears current article once user goes back to feed.
//  */
// export const leaveArticle = () => (dispatch) => {
//   dispatch({ type: ActionTypes.LEAVE_ARTICLE });
// };

/**
 * Bookmarks an article
 * @param {Integer} userID The current user
 * @param {String} articleID The article being bookmarked
 * @param {Array} bookmarkedArticles The current list of bookmarked articles
 */
export const bookmarkArticle = (userID, articleID, bookmarkedArticles) => (
  dispatch
) => {
  const bookmarked = [...bookmarkedArticles, articleID];
  dispatch({ type: ActionTypes.BOOKMARK_ARTICLE, payload: bookmarked });
  axios
    .put(`${ROOT_URL}/articles/${userID}/${articleID}`)
    .then((response) => {
      dispatch({
        type: ActionTypes.BOOKMARK_ARTICLE,
        payload: response.data.user.bookmarkedArticles,
      });
    })
    .catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
};

/**
 * Unbookmarks an article
 * @param {Integer} userID The current user
 * @param {String} articleID The article being unbookmarked
 * @param {Array} bookmarkedArticles The current list of bookmarked articles
 */
export const unbookmarkArticle = (userID, articleID, bookmarkedArticles) => (
  dispatch
) => {
  const bookmarked = [...bookmarkedArticles];
  const index = bookmarked.indexOf(articleID);
  if (index > -1) {
    bookmarked.splice(index);
  }
  dispatch({ type: ActionTypes.BOOKMARK_ARTICLE, payload: bookmarked });
  axios
    .put(`${ROOT_URL}/articles/${userID}/${articleID}`)
    .then((response) => {
      dispatch({
        type: ActionTypes.BOOKMARK_ARTICLE,
        payload: response.data.user.bookmarkedArticles,
      });
    })
    .catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
};