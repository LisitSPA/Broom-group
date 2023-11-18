import { apiAction } from "./api";

export const VERSIONS = "@@versions/version/GET";
export const VERSIONS_SUCCESS = "@@versions/version/GET_SUCCESS";
export const VERSIONS_ERROR = "@@versions/version/GET_ERROR";
export const CREATE_VERSION = "@@versions/version/POST";
export const CREATE_VERSION_SUCCESS = "@@versions/version/POST_SUCCESS";
export const CREATE_VERSION_ERROR = "@@versions/version/POST_ERROR";
export const DELETE_VERSION = "@@versions/version/DELETE";
export const DELETE_VERSION_SUCCESS = "@@versions/version/DELETE_SUCCESS";
export const DELETE_VERSION_ERROR = "@@versions/version/DELETE_ERROR";
export const UPDATE_VERSION = "@@versions/version/PUT";
export const UPDATE_VERSION_SUCCESS = "@@versions/version/PUT_SUCCESS";
export const UPDATE_VERSION_ERROR = "@@versions/version/PUT_ERROR";
export const UPDATE_SELECTED_VERSION = "@@versions/version/selector";
export const SET_SEARCH_TEXT = "@@versions/version/search";

export const callVersion = (version_id, onSuccess, onFailure) => {
  return apiAction({
    label: VERSIONS,
    method: "GET",
    url: `/versions/${version_id}`,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

// export const callVersions = (onSuccess, onFailure) => {
//   return apiAction({
//     label: VERSIONS_LIST,
//     method: "GET",
//     url: `/versions`,
//     onSuccess: onSuccess,
//     onFailure: onFailure,
//   });
// };
export const createVersion = (body, onSuccess, onFailure) => {
  return apiAction({
    label: CREATE_VERSION,
    method: "POST",
    url: `/versions`,
    data: body,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

export const deleteVersion = (version_id, onSuccess, onFailure) => {
  return apiAction({
    label: DELETE_VERSION,
    method: "DELETE",
    url: `/versions/${version_id}`,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

export const updateVersion = (version_id, body, onSuccess, onFailure) => {
  return apiAction({
    label: UPDATE_VERSION,
    method: "PUT",
    url: `/versions/${version_id}`,
    data: body,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
};

export const updateSelectedVersion = (versionId) => ({
  type: UPDATE_SELECTED_VERSION,
  payload: versionId,
});

export const setSearchText = (searchText) => ({
  type: SET_SEARCH_TEXT,
  payload: searchText,
});
