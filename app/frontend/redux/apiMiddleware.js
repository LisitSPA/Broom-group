import axios from 'axios';
import { API } from './actions/api';
import { apiError, apiStart, apiEnd } from './actions/api';

const apiMiddleware = (store) => (next) => (action) => {
  next(action);

  if (action.type !== API) return;

  const { dispatch } = store;
  const { url: endpoint, method, data, onUploadProgress, onSuccess, onFailure, label, headers } = action.payload;
  
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
  
  const url = '/api/v1' + endpoint;

  headers['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0]['content'];
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  
  if (label) {
    dispatch(apiStart(label));
  }

  axios
    .request({
      url,
      method,
      headers,
      withCredentials: true,
      [dataOrParams]: data,
      onUploadProgress
    })
    .then(({ data }) => {
      if (onSuccess) onSuccess(data);
      if (label) {
        dispatch({ type: `${label}_SUCCESS`, payload: data });
      }
    })
    .catch((error) => {
      if (onFailure) onFailure(error);
      dispatch(apiError(error));
      if (label) {
        dispatch({ type: `${label}_ERROR`, payload: error });
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
