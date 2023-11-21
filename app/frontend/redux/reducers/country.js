import {
  COUNTRY,
  COUNTRY_SUCCESS,
  COUNTRY_ERROR
} from "../actions/country";

const countryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COUNTRY:
      return {
        ...state,
        isFetching: true,
      };
    case COUNTRY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case COUNTRY_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const defaultState = {
  isFetching: false,
  errors: null,
  response: {
    id: null,
    name: null,
    created_at: null,
    updated_at: null
  },
};

export {
  countryReducer
};