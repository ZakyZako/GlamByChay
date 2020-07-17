import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../../actions/index";
import "./cartTile.scss";

const CartTile = (props) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userDataFromToken.token);

  const incrementCheck = () => {
    dispatch(addProduct(props.cartProduct.product.id, userToken));
  };

  const decrementCheck = () => {
    dispatch(removeProduct(props.cartProduct.product.id, userToken));
  };

  const deleteProduct = () => {
    dispatch(
      removeProduct(
        props.cartProduct.product.id,
        userToken,
        props.cartProduct.quantity
      )
    );
  };

  return (
    <div className="cart-tile">
      <div className="cart-tile__wrapper-img">
        <img
          className="cart-tile__wrapper-img__img"
          src={props.cartProduct.product.img_path}
          alt="imgPath"
        />
      </div>
      <div className="cart-tile__wrapper-info">
        <h3 className="cart-tile__wrapper-info__name">
          {props.cartProduct.product.name}
        </h3>

        <span>{props.cartProduct.total_price}€</span>
      </div>
      <div className="cart-tile__wrapper">
        <span
          className="cart-tile__wrapper__delete-button"
          onClick={() => {
            deleteProduct();
          }}
        >
          Supprimer
        </span>
        <div className="cart-tile__wrapper__wrapper-button">
          <span
            className="cart-tile__wrapper__wrapper-button__button"
            onClick={() => {
              decrementCheck();
            }}
          >
            -
          </span>
          <span> {props.cartProduct.quantity}</span>
          <span
            className="cart-tile__wrapper__wrapper-button__button"
            onClick={() => {
              incrementCheck();
            }}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};
export default CartTile;
