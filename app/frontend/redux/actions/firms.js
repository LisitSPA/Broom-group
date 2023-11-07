import { apiAction } from "./api";

export const FIRM = "@@firm/GET"
export const FIRM_SUCCESS = "@@firm/GET_SUCCESS"
export const FIRM_ERROR = "@@firm/GET_ERROR"

export const callFirm = (firmId, onSuccess, onFailure) => {
  return apiAction({
    label: FIRM,
    method: "GET",
    url: `/firms/${firmId}`,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}