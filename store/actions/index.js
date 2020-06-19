import * as articleActions from './article-actions';
import * as loadingActions from './loading-actions';

export const ActionTypes = {
  ...articleActions.ActionTypes
}

export default { ...articleActions, ...loadingActions };