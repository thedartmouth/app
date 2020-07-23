import { combineReducers } from 'redux';
import articleReducer from './article-reducer';
import loadingReducer from './loading-reducer';
import errorReducer from './error-reducer';

export default combineReducers({
  articles: articleReducer,
  loading: loadingReducer,
  errors: errorReducer,
});
