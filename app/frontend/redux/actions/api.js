export const API = "@@api";
export const API_START = "@@api/START";
export const API_END = "@@api/END";
export const API_ERROR = "@@api/ERROR";

export const apiStart = (label) => ({
  type: API_START,
  payload: label,
});

export const apiEnd = (label) => ({
  type: API_END,
  payload: label,
});

export const apiError = (error) => ({
  type: API_ERROR,
  payload: error,
});

export function apiAction({
  url = "",
  method = "GET",
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  onUploadProgress = () => {},
  label = "",
  headers = {},
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      onUploadProgress,
      label,
      headers,
    },
  };
}
