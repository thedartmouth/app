import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { CMS_URL, ROOT_URL } from "../../constants";
import { types } from '../../lib';
import { showAuthModal } from "./user-actions";

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
  BOOKMARK_ARTICLE: {
    REQUEST: 'BOOKMARK_ARTICLE_REQUEST',
    SUCCESS_ADD: 'BOOKMARK_ARTICLE_SUCCESS_ADD',
    SUCCESS_DELETE: 'BOOKMARK_ARTICLE_SUCCESS_DELETE',
    FAILURE: 'BOOKMARK_ARTICLE_FAILURE'
  },
  READ_ARTICLE: {
    REQUEST: 'READ_ARTICLE_REQUEST',
    SUCCESS: 'READ_ARTICLE_SUCCESS'
  },
  EXIT_ARTICLE: 'EXIT_ARTICLE',
  GET_BOOKMARKS: {
    REQUEST: 'GET_BOOKMARKS_REQUEST',
    SUCCESS: 'GET_BOOKMARKS_SUCCESS',
    FAILURE: 'GET_BOOKMARKS_FAILURE',
  },
};

const CMS_QUERY_SETTINGS = (page) => `a=1&ty=article&per_page=50&page=${page || 1}`

/**
 * Pulls the most recent set of articles from all sections on page 1 `and saves to store.
 */
export const refreshFeed = (dispatch) => () =>
  new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.REFRESH_FEED.REQUEST });
    axios
      .get(`${CMS_URL}/search.json?${CMS_QUERY_SETTINGS()}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.REFRESH_FEED.SUCCESS,
          payload: response.data.items.filter(types.articleFilter).map(types.articleConverter),
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
    axios
      .get(`${CMS_URL}/search.json?${CMS_QUERY_SETTINGS(page)}`)
      .then((response) => {
        dispatch({ type: ActionTypes.ADD_FEED, payload: response.data.items.filter(types.articleFilter).map(types.articleConverter) });
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
        results: response.data.articles.filter(types.articleFilter).map(types.articleConverter),
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
        results: response.data.items.filter(types.articleFilter).map(types.articleConverter),
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

export const getBookmarks = (dispatch) => async () => {
  dispatch({type: ActionTypes.GET_BOOKMARKS.REQUEST });
  try {
    const userId = await SecureStore.getItemAsync('userId')
    const res = await axios
      .get(`${ROOT_URL}/articles/bookmarks/${userId}`)
    const populatedBookmarks = await Promise.all(
      res.data.map(({slug}) => new Promise((resolve) => {
        axios.get(`${CMS_URL}/article/${slug}.json`).then(articleRes => resolve(types.articleConverter(articleRes.data.article)))
      }))
    )
    dispatch({type: ActionTypes.GET_BOOKMARKS.SUCCESS, payload: {
      results: populatedBookmarks,
      total: populatedBookmarks.length
    }});
  }
  catch (err) {
    console.error(err);
    dispatch({type: ActionTypes.GET_BOOKMARKS.FAILURE});
  }
}

/**
 * Sends to backend the current article and receives an object back containing data like views.
 * @param {import("../../lib/types").Article} article The article to send backend (current article).
 */
export const readArticle = (dispatch) => (article) => new Promise(async (resolve) => {
  dispatch({ type: ActionTypes.READ_ARTICLE.REQUEST, payload: article })
  const userId = await SecureStore.getItemAsync('userId')
  axios.post(
    `${ROOT_URL}/articles/reads`,
    {
      articleSlug: article.slug,
      userId
    })
    .then(() => {
      axios.get(`${ROOT_URL}/articles/${article.slug}${userId ? `?for=${userId}` : ''}`).then((metaArticleRes) => {
        dispatch({type: ActionTypes.READ_ARTICLE.SUCCESS, payload: {...article, ...metaArticleRes.data} })
        resolve();
      })
    });
  });

export const exitArticle = (dispatch) => () => dispatch({ type: ActionTypes.EXIT_ARTICLE })

/**
 * Bookmarks an article
 * @param {String} articleSlug The article being bookmarked
 */
export const bookmarkArticle = (dispatch) => async (articleSlug) => {
  dispatch({ type: ActionTypes.BOOKMARK_ARTICLE.REQUEST, payload: articleSlug });
  try {
    const userId = await SecureStore.getItemAsync('userId')
    if (!userId) {
      showAuthModal(dispatch)()
      // dispatch({ type: ActionTypes.BOOKMARK_ARTICLE.FAILURE, payload: articleSlug });
      throw new Error('not authed')
    }
    const res = await axios
      .post(
        `${ROOT_URL}/articles/bookmarks/${userId}`,
          {
            articleSlug
          }
        )
    switch (res.status) {
      case 201:
        dispatch({
          type: ActionTypes.BOOKMARK_ARTICLE.SUCCESS_ADD,
          payload: articleSlug
        });
        break
      case 200:
        dispatch({
          type: ActionTypes.BOOKMARK_ARTICLE.SUCCESS_DELETE,
          payload: articleSlug,
        });
        break
      default:
        // dispatch({ type: ActionTypes.BOOKMARK_ARTICLE.FAILURE, payload: articleSlug });
        throw new Error('failed bookmark')
    }
  } catch (err) {
    console.log(err)
    dispatch({ type: ActionTypes.BOOKMARK_ARTICLE.FAILURE, payload: articleSlug });
  }
};