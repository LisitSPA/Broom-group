import {
  FIRM,
  FIRM_SUCCESS,
  FIRM_ERROR,
} from '../actions/firms';

const defaultState = {
  isFetching: false,
  errors: null,
  response: {
    firmData: {
      firmId: null,
      firmProfileId: null,
      title: null,
      description: null,
      rut: null,
      country: null,
      sapCode: null,
    },
    ownersMap: {
      adjacencyList: {},
      cycles: {},
      finalFirms: [],
      levels: {}
    }
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FIRM:
      return {
        ...state,
        isFetching: true,
      };
    case FIRM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errors: null,
        response: action.payload,
      };
    case FIRM_ERROR:
      return {
        ...state,
        errors: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
}