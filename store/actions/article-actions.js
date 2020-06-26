import axios from 'axios';
import { CMS_URL, SECTIONS, ROOT_URL } from '../../constants';

export const ActionTypes = {
  REFRESH_FEED: {
    REQUEST: 'REFRESH_FEED_REQUEST',
    SUCCESS: 'REFRESH_FEED_SUCCESS',
    FAILURE: 'REFRESH_FEED_FAILURE',
  },
  READ_ARTICLE: 'READ_ARTICLE',
  LEAVE_ARTICLE: 'LEAVE_ARTICLE',
  ERROR_SET: 'ERROR_SET',
}

/**
 * Pulls the most recent set of articles from a certain section and saves to redux store.
 * @param {String} section The section to fill the newsfeed with. Should be one of [].
 */
// export const refreshFeed = (section) => {
//   return dispatch => new Promise((resolve, reject) => {
//     dispatch({type: ActionTypes.REFRESH_FEED.REQUEST});
//     axios.get(`${CMS_URL}/section/${section}.json`).then(response => {
//       dispatch({type: ActionTypes.REFRESH_FEED.SUCCESS, payload: response.data.articles});
//       resolve();
//     }).catch(error => {
//       dispatch({type: ActionTypes.REFRESH_FEED.FAILURE});
//       reject(error);
//     })
//   })
// }

export const refreshFeed = () => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({type: ActionTypes.REFRESH_FEED.REQUEST});
    const requests = SECTIONS.map((section) => {
      return axios.get(`${CMS_URL}/section/${section}.json`);
    });
    Promise.all(requests).then((responses) => {
      const results = responses.map((response) => {
        return response.data.articles; // clean up results
      });
      const articles = [].concat.apply([], results); // merge subarrays in results into 1 array
      articles.sort(function(a,b){
        return a.created_at < b.created_at;
      });
      articles.forEach((article) => console.log(article.created_at));
      uniqueArticles = articles.filter((articleA, index, self) =>
      self.findIndex((articleB) => articleA.ceo_id === articleB.ceo_id) === index); // filter unique articles
      dispatch({type: ActionTypes.REFRESH_FEED.SUCCESS, payload: uniqueArticles});

    }).catch((error) => {
      dispatch({type: ActionTypes.REFRESH_FEED.FAILURE});
      reject(error);
    });

  });
}

/**
 * Sends to backend the current article and receives an object back containing data like views.
 * @param {String} article The article to send backend (current article).
 */
export const readArticle = (article) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/articles/read`, article)
      .then((response) => {
        console.log(response.data);
        dispatch({ type: ActionTypes.READ_ARTICLE, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/**
 * Clears current article once user goes back to feed.
 */
export const leaveArticle = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LEAVE_ARTICLE }); 
  };
}