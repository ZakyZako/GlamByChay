import { TOGGLE_MODAL } from "../actions/action-types";

const initialState = {
  modalOpen: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        modalOpen: action.payload,
      };
    default:
      return state;
  }
}
