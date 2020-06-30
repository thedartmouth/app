import axios from 'axios';
import { CMS_URL, SECTIONS } from '../../constants';

export const ActionTypes = {
  REFRESH_FEED: {
    REQUEST: 'REFRESH_FEED_REQUEST',
    SUCCESS: 'REFRESH_FEED_SUCCESS',
    FAILURE: 'REFRESH_FEED_FAILURE',
  },
}

/**
 * Pulls the most recent set of articles from a certain section and saves to redux store.
 * @param {String} section The section to fill the newsfeed with. Should be one of [].
 */
export const refreshFeed = (section) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({type: ActionTypes.REFRESH_FEED.REQUEST});
    axios.get(`${CMS_URL}/section/${section}.json`).then(response => {
      dispatch({type: ActionTypes.REFRESH_FEED.SUCCESS, payload: response.data.articles});
      resolve();
    }).catch(error => {
      dispatch({type: ActionTypes.REFRESH_FEED.FAILURE});
      reject(error);
    })
  })
}