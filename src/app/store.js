import thunk from "redux-thunk";
import modalReducer from "../reducers/modalReducer";
import { configureStore } from "@reduxjs/toolkit";
import fetchUserDataFromToken from "../reducers/fetchDataFromTokenReducer";
import cartReducer from "../reducers/cartReducer";
import apiResponseHandlerReducer from "../reducers/apiResponseHandlerReducer";

const middleware = [thunk];

const reducer = {
  modal: modalReducer,
  cart: cartReducer,
  userDataFromToken: fetchUserDataFromToken,
  apiResponse: apiResponseHandlerReducer,
};

export default configureStore({
  reducer,
  middleware,
});
