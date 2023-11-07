import { apiAction } from "./api";

export const FIRM_PROFILE = "@@firm_profile/GET"
export const FIRM_PROFILE_SUCCESS = "@@firm_profile/GET_SUCCESS"
export const FIRM_PROFILE_ERROR = "@@firm_profile/GET_ERROR"
export const FIRM_PROFILE_CREATE = "@@firm_profile/CREATE"
export const FIRM_PROFILE_CREATE_SUCCESS = "@@firm_profile/CREATE_SUCCESS"
export const FIRM_PROFILE_CREATE_ERROR = "@@firm_profile/CREATE_ERROR"
export const FIRM_PROFILE_DELETE = "@@firm_profile/DELETE"
export const FIRM_PROFILE_DELETE_SUCCESS = "@@firm_profile/DELETE_SUCCESS"
export const FIRM_PROFILE_DELETE_ERROR = "@@firm_profile/DELETE_ERROR"
export const FIRM_PROFILE_UPDATE = "@@firm_profile/UPDATE"
export const FIRM_PROFILE_UPDATE_SUCCESS = "@@firm_profile/UPDATE_SUCCESS"
export const FIRM_PROFILE_UPDATE_ERROR = "@@firm_profile/UPDATE_ERROR"

export const callFirmProfile = (onSuccess, onFailure) => {
  return apiAction({
    label: FIRM_PROFILE,
    method: "GET",
    url: '/firm_profiles',
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}

export const createFirmProfile = (body, onSuccess, onFailure) => {
  return apiAction({
    label: FIRM_PROFILE_CREATE,
    method: "POST",
    url: '/firm_profiles',
    data: body,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}

export const deleteFirmProfile = (firm_profile_id, onSuccess, onFailure) => {
  return apiAction({
    label: FIRM_PROFILE_DELETE,
    method: "DELETE",
    url: `/firm_profiles/${firm_profile_id}`,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}

export const updateFirmProfile = (firm_profile_id, body, onSuccess, onFailure) => {
  return apiAction({
    label: FIRM_PROFILE_UPDATE,
    method: "PUT",
    url: `/firm_profiles/${firm_profile_id}`,
    data: body,
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}