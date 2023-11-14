import {
  VERSIONS,
  VERSIONS_LIST,
  VERSIONS_SUCCESS,
  VERSIONS_ERROR,
  CREATE_VERSION,
  CREATE_VERSION_SUCCESS,
  CREATE_VERSION_ERROR,
  DELETE_VERSION,
  DELETE_VERSION_SUCCESS,
  DELETE_VERSION_ERROR,
  UPDATE_VERSION,
  UPDATE_VERSION_SUCCESS,
  UPDATE_VERSION_ERROR,
  VERSIONS_LIST_SUCCESS,
  VERSIONS_LIST_ERROR,
  UPDATE_SELECTED_VERSION,
} from "../actions/versions";

const defaultState = {
  isFetching: false,
  errors: null,
  response: null,
};

const versionDefaultState = {
  isFetching: false,
  errors: null,
  response: {
    versionId: null,
    firmsSignature: null,
    investorsSignature: null,
    firms: [],
  },
};

const versionReducer = (state = versionDefaultState, action) => {
  switch (action.type) {
    case VERSIONS:
      return {
        ...state,
        isFetching: true,
      };
    case VERSIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case VERSIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.response.data,
      };
    default:
      return state;
  }
};

const versionListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case VERSIONS_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case VERSIONS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case VERSIONS_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.response.data,
      };
    default:
      return state;
  }
};

const createVersionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_VERSION:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_VERSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case CREATE_VERSION_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const deleteVersionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DELETE_VERSION:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_VERSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case DELETE_VERSION_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const updateVersionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_VERSION:
      return {
        ...state,
        isFetching: true,
      };
    case UPDATE_VERSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case UPDATE_VERSION_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const selectedVersionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_VERSION:
      return action.payload;
    default:
      return state;
  }
};

export {
  versionReducer,
  createVersionReducer,
  deleteVersionReducer,
  updateVersionReducer,
  versionListReducer,
  selectedVersionReducer,
};
