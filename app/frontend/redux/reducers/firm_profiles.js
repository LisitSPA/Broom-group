import {
  FIRM_PROFILE,
  FIRM_PROFILE_SUCCESS,
  FIRM_PROFILE_ERROR,
  FIRM_PROFILE_CREATE,
  FIRM_PROFILE_CREATE_SUCCESS,
  FIRM_PROFILE_CREATE_ERROR,
  FIRM_PROFILE_DELETE,
  FIRM_PROFILE_DELETE_SUCCESS,
  FIRM_PROFILE_DELETE_ERROR,
  FIRM_PROFILE_UPDATE,
  FIRM_PROFILE_UPDATE_SUCCESS,
  FIRM_PROFILE_UPDATE_ERROR,
  SEARCH_FIRM_PROFILE,
  SEARCH_FIRM_PROFILE_SUCCESS,
  SEARCH_FIRM_PROFILE_ERROR,
} from "../actions/firm_profiles";

const firmProfilesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FIRM_PROFILE:
      return {
        ...state,
        isFetching: true,
      };
    case FIRM_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case FIRM_PROFILE_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const createFirmProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FIRM_PROFILE_CREATE:
      return {
        ...state,
        isFetching: true,
      };
    case FIRM_PROFILE_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case FIRM_PROFILE_CREATE_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const deleteFirmProfileReducer = (state = defaultDeleteState, action) => {
  switch (action.type) {
    case FIRM_PROFILE_DELETE:
      return {
        ...state,
        isFetching: true,
      };
    case FIRM_PROFILE_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case FIRM_PROFILE_DELETE_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const updateFirmProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FIRM_PROFILE_UPDATE:
      return {
        ...state,
        isFetching: true,
      };
    case FIRM_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case FIRM_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const searchFirmProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_FIRM_PROFILE:
      return {
        ...state,
        isFetching: true,
      };
    case SEARCH_FIRM_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case SEARCH_FIRM_PROFILE_ERROR:
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
    firmProfileId: null,
    title: null,
    description: null,
    rut: null,
    sapCode: null,
    country: null,
  },
};

const defaultDeleteState = {
  isFetching: false,
  errors: null,
  response: {},
};

export {
  firmProfilesReducer,
  createFirmProfileReducer,
  deleteFirmProfileReducer,
  updateFirmProfileReducer,
  searchFirmProfileReducer,
};
