import {
  ADD_PRODUCT,
  GET_CART,
  TOGGLE_CART,
  DELETE_PRODUCT,
} from "../actions/action-types";

const initialState = {
  products: {},
  isOpen: false,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        products: action.payload,
      };
    case TOGGLE_CART:
      return {
        ...state,
        isOpen: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
