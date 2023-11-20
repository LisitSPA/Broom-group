import { apiAction } from "./api";

export const Country = "@@Country/GET";
export const Country_SUCCESS = "@@Country/GET_SUCCESS";
export const Country_ERROR = "@@Country/GET_ERROR";

export const callCountry = (onSuccess, onFailure) => {
  return apiAction({
    label: Country,
    method: "GET",
    url: "/Country",
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}