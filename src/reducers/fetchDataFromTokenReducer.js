import {
  FETCH_DATA_FROM_CONNECTION,
  USER_LOGOUT,
} from "../actions/action-types";

export default function fetchDataFromTokenReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_DATA_FROM_CONNECTION:
      return action.payload;
    case USER_LOGOUT:
      return (state = {});
    default:
      return state;
  }
}
