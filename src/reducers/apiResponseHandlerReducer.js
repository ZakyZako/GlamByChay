import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../actions/action-types";

const initialState = {
  errorMessage: null,
  successMessage: null,
};

export default function apiResponseHandlerReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };
    default:
      return state;
  }
}
