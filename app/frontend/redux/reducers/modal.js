import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/modal';

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalType: null,
        isOpen: false,
      };
    default:
      return state;
  }
}

const defaultState = {
  modalType: null,
  isOpen: false,
}