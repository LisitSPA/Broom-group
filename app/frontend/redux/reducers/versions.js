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
// const searchTextReducer = (state = versionDefaultState, action) => {
//   switch (action.type) {
//     case SET_SEARCH_TEXT:
//       console.log(state?.response.firms, state, action.payload);
//       // const filteredData = state?.response.firms;
//       return {
//         ...state,
//         searchText: action.payload,
//       };

//     default:
//       return state;
//   }
// };
export {
  versionReducer,
  createVersionReducer,
  deleteVersionReducer,
  updateVersionReducer,
  selectedVersionReducer,
};
