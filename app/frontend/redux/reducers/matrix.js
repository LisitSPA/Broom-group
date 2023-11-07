import {
  MATRIX,
  MATRIX_SUCCESS,
  MATRIX_ERROR,
} from '../actions/matrix';

const defaultState = {
  isFetching: false,
  response: {
    matrixId: null,
    matrixName: null,
    matrixDescription: null,
    versionsCount: null,
    lastVersionId: null,
    versions: [],
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case MATRIX:
      return {
        ...state,
        isFetching: true,
      };
    case MATRIX_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.payload,
      };
    case MATRIX_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
