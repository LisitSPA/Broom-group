import { apiAction } from "./api";

export const COUNTRY = "@@country/GET";
export const COUNTRY_SUCCESS = "@@country/GET_SUCCESS";
export const COUNTRY_ERROR = "@@country/GET_ERROR";

export const callCountry = (onSuccess, onFailure) => {
 return apiAction({
    label: COUNTRY,
    method: "GET",
    url: "/country",
    onSuccess: onSuccess,
    onFailure: onFailure,
  });
}