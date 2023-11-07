import { apiAction } from "./api";

export const MATRIX = "@@matrices/matrix/GET";
export const MATRIX_SUCCESS = "@@matrices/matrix/GET_SUCCESS";
export const MATRIX_ERROR = "@@matrices/matrix/GET_ERROR";

export const callMatrix = (onSuccess, onFailure) => {
  return apiAction({
    label: MATRIX,
    method: "GET",
    url: "/matrix",
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}