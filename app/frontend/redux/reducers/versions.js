import {
  VERSIONS,
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
  UPDATE_SELECTED_VERSION,
  SET_SEARCH_TEXT,
  UPDATE_OWNERSHIP_PERCENTAGE,
  ADD_NEW_FIRM,
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
    filteredData: null,
  },
};
const defaultSelectedVersionState = {
  selectedVersion: "",
};

const defaultSearchTextState = {
  searchText: "",
};

function filterFirms(array, searchTerm) {
  const formattedSearch = searchTerm.toLowerCase().replace(/[\.\-]/g, "");

  return array.filter((firm) => {
    const formattedRut = firm.rut.replace(/[\.\-]/g, "");
    const formattedName = firm.name.toLowerCase();

    return (
      formattedName.includes(formattedSearch) ||
      formattedRut.includes(formattedSearch)
    );
  });
}

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
    case SET_SEARCH_TEXT:
      let filteredData = [];
      if (action.payload) {
        filteredData = filterFirms(state.response.firms, action.payload);
      } else {
        filteredData = null;
      }
      return {
        ...state,
        response: {
          ...state.response,
          filteredData,
        },
      };
    case ADD_NEW_FIRM:
      console.log("Aqui");
      console.log(action.payload);
      console.log(state.response.firms);
      console.log("state.response.firms");
      return {
        ...state,
        response: action.payload,
        // "firms": [...state.response.firms, ...action.payload.firms],
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
      const newVersion = action.payload;

      return {
        ...state,
        isFetching: false,
        response: {
          ...state.response,
          versions: [...state.response.versions, newVersion],
        },
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

const selectedVersionReducer = (
  state = defaultSelectedVersionState,
  action
) => {
  switch (action.type) {
    case UPDATE_SELECTED_VERSION:
      return {
        ...state,
        selectedVersion: action.payload,
      };
    default:
      return state;
  }
};
export const updatedOwnershipReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_OWNERSHIP_PERCENTAGE:
      return {
        ...state,
        updatedOwnership: action.payload,
      };

    default:
      return state;
  }
};

export {
  versionReducer,
  createVersionReducer,
  deleteVersionReducer,
  updateVersionReducer,
  selectedVersionReducer,
};
