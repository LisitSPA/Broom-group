// actions/country.js

import { apiAction } from "./api";

export const COUNTRY = "@@country/GET";
export const COUNTRY_SUCCESS = "@@country/GET_SUCCESS";
export const COUNTRY_ERROR = "@@country/GET_ERROR";

export const callCountry = () => {
  return apiAction({
    label: COUNTRY,
    method: "GET",
    url: "/country",
    onSuccess: (dispatch, response) => {
      //console.log("Respuesta de la solicitud de países:", response);
      dispatch({
        type: COUNTRY_SUCCESS,
        payload: response.data, // Asumiendo que la respuesta tiene una propiedad 'data' con la lista de países
      });
    },
    onFailure: (dispatch, error) => {
      // Aquí puedes despachar la acción de error si es necesario
    },
  });
};
