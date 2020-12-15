import axios from "axios";
import { CMS_URL, ROOT_URL } from "../../constants";
import { types } from '../../lib';

export const ActionTypes = {
  REFRESH_FEED: {
    REQUEST: "REFRESH_FEED_REQUEST",
    SUCCESS: "REFRESH_FEED_SUCCESS",
    FAILURE: "REFRESH_FEED_FAILURE",
  },
  DISCOVER_ARTICLES_BY_TAG: {
    REQUEST: "DISCOVER_ARTICLES_BY_TAG_REQUEST",
    SUCCESS: "DISCOVER_ARTICLES_BY_TAG_SUCCESS",
    FAILURE: "DISCOVER_ARTICLES_BY_TAG_FAILURE",
  },
  SEARCH_ARTICLES: {
    REQUEST: "SEARCH_ARTICLES_REQUEST",
    SUCCESS: "SEARCH_ARTICLES_SUCCESS",
    FAILURE: "SEARCH_ARTICLES_FAILURE",
  },
  ADD_FEED: "ADD_FEED",
  SET_PAGE: "SET_PAGE",
  BOOKMARK_ARTICLE: "BOOKMARK_ARTICLE",
  GET_BOOKMARKS: {
    REQUEST: 'GET_BOOKMARKS_REQUEST',
    SUCCESS: 'GET_BOOKMARKS_SUCCESS',
    FAILURE: 'GET_BOOKMARKS_FAILURE',
  },
  ERROR_SET: "ERROR_SET",
};

const CMS_QUERY_SETTINGS = (page) => `a=1&ty=article&per_page=10&page=${page || 1}`

/**
 * Pulls the most recent set of articles from all sections on page 1 and saves to store.
 */
export const refreshFeed = (dispatch) => () =>
  new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.REFRESH_FEED.REQUEST });
    axios
      .get(`${CMS_URL}/search.json?${CMS_QUERY_SETTINGS()}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.REFRESH_FEED.SUCCESS,
          payload: response.data.items.map(types.articleConverter),
        });
        resolve();
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.REFRESH_FEED.FAILURE });
        reject(error);
      });
  });

/**
 * Pulls the most recent set of articles from all sections on a given page and adds to store.
 * @param {Integer} page The current page to fill the newsfeed with.
 */
export const addFeed = (dispatch) => (page) =>
  new Promise((resolve) => {
    console.log(`adding page ${page} to feed`);
    axios
      .get(`${CMS_URL}/search.json?${CMS_QUERY_SETTINGS(page)}`)
      .then((response) => {
        dispatch({ type: ActionTypes.ADD_FEED, payload: response.data.items.map(types.articleConverter) });
        resolve();
      });
  });

export const discoverArticlesByTag = (dispatch) => (tag, page) => {
  dispatch({type: ActionTypes.DISCOVER_ARTICLES_BY_TAG.REQUEST, reset: page === 1});
  new Promise((resolve, reject) => {
    axios
    .get(`${CMS_URL}/section/${tag}.json?${CMS_QUERY_SETTINGS(page)}`)
    .then((response) => {
      dispatch({type: ActionTypes.DISCOVER_ARTICLES_BY_TAG.SUCCESS, payload: {
        results: response.data.articles.map(types.articleConverter),
        total: response.data.pagination.total
      }});
      resolve();
    })
    .catch(error => {
      console.error(error);
      dispatch({type: ActionTypes.DISCOVER_ARTICLES_BY_TAG.FAILURE});
      reject(error);
    });
  })
}

export const searchArticles = (dispatch) => (query, page) => {
  dispatch({type: ActionTypes.SEARCH_ARTICLES.REQUEST, reset: page === 1});
  new Promise((resolve, reject) => {
    axios
    .get(`${CMS_URL}/search.json?s=${query}&${CMS_QUERY_SETTINGS(page)}`)
    .then((response) => {
      dispatch({type: ActionTypes.SEARCH_ARTICLES.SUCCESS, payload: {
        results: response.data.items.map(types.articleConverter),
        total: response.data.total
      }});
      resolve();
    })
    .catch(error => {
      console.error(error);
      dispatch({type: ActionTypes.SEARCH_ARTICLES.FAILURE});
      reject(error);
    });
  })
}

/**
 * Sends to backend the current article and receives an object back containing data like views.
 * @param {String} article The article to send backend (current article).
 */
export const readArticle = (dispatch) => (article) => new Promise((resolve) => {
  axios.post(`${ROOT_URL}/articles/read`, article)
    .then((response) => {
      resolve(response.data);
    });
  });

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