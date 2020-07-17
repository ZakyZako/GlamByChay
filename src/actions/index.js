import axios from "axios";
import {
  TOGGLE_MODAL,
  FETCH_DATA_FROM_CONNECTION,
  USER_LOGOUT,
  TOGGLE_CART,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_CART,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "./action-types";

export const toggleModal = (isOpen) => (dispatch) => {
  dispatch({ type: TOGGLE_MODAL, payload: isOpen });
  dispatch(errorMessage(null));
  dispatch(successMessage(null));
};

export const toggleCart = (isOpen) => (dispatch) => {
  dispatch({ type: TOGGLE_CART, payload: isOpen });
};

export const connection = (user) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_API_KEY}/api/login`, {
      username: user.mail,
      password: user.password,
    })
    .then((response) => {
      if (response.data.token) {
        dispatch(toggleModal(false));
        dispatch(getCart(response.data.token));
      }
      if (user.stayConnected) {
        localStorage.setItem("userToken", response.data.token);
      }
      dispatch(fetchUserDataFromConnection(response.data.token));
    })
    .catch((error) => {
      dispatch({
        type: ERROR_MESSAGE,
        payload: error.response.data.message,
      });
    });
};

export const fetchUserDataFromConnection = (token) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_KEY}/api/user/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      dispatch({
        type: FETCH_DATA_FROM_CONNECTION,
        payload: { ...response.data, token },
      });
      dispatch(getCart(token));
    });
};

export const errorMessage = (errorMessage) => (dispatch) => {
  dispatch({
    type: ERROR_MESSAGE,
    payload: errorMessage,
  });
};

export const successMessage = (successMessage) => (dispatch) => {
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: successMessage,
  });
};

export const logOutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: ADD_PRODUCT, payload: { cart_products: [] } });
};

export const getCart = (token) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_API_KEY}/api/cart/current`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      dispatch({ type: GET_CART, payload: response.data });
    });
};

export const addProduct = (id, token, quantity) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_KEY}/api/cart/addProduct`,
      null,

      {
        params: {
          productId: id,
          quantity: quantity,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      dispatch({ type: ADD_PRODUCT, payload: response.data });
    });
};

export const removeProduct = (id, token, quantity) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_API_KEY}/api/cart/removeProduct`,
      null,

      {
        params: {
          productId: id,
          quantity: quantity,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      dispatch({ type: DELETE_PRODUCT, payload: response.data });
    });
};
