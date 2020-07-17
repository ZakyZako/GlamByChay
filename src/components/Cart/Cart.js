import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleCart, toggleModal } from "../../actions/index";
import classnames from "classnames";
import CartTile from "./CartTile/CartTile";
import "./cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userDataFromToken.token);
  const cartOpen = useSelector((state) => state.cart.isOpen);
  const products = useSelector((state) => state.cart.products);

  const cartMessage = () => {
    if (!userToken) {
      return (
        <div className="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty">
          <p className="cart__wrapper-cart__wrapper-cart-tile__message">
            Veuillez vous connecter sur votre compte afin d'ajouter des articles
            à votre panier
          </p>
          <button
            className="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty__button"
            onClick={() => {
              dispatch(toggleCart(false));
              dispatch(toggleModal(true));
            }}
          >
            Je me connecte
          </button>
        </div>
      );
    } else if (products.cart_products?.length === 0) {
      return (
        <div className="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty">
          <span>Votre panier est vide</span>
          <button
            className="cart__wrapper-cart__wrapper-cart-tile__wrapper-cart-empty__button"
            onClick={() => {
              dispatch(toggleCart(false));
            }}
          >
            Continuer vos achats
          </button>
        </div>
      );
    }
  };

  return (
    <div className="cart">
      <div
        className={classnames("cart__overlay", {
          "cart__overlay--none": !cartOpen,
        })}
        onClick={() => {
          dispatch(toggleCart(false));
        }}
      ></div>
      <div
        className={classnames("cart__wrapper-cart", {
          "cart__wrapper-cart--open": cartOpen,
        })}
      >
        <div className="cart__wrapper-cart__header">
          <h2 className="cart__wrapper-cart__header__title">TON PANIER </h2>
          <FontAwesomeIcon
            className="cart__wrapper-cart__header__crossIcon-cart"
            onClick={() => {
              dispatch(toggleCart(false));
            }}
            icon="times"
          />
        </div>
        <div className="cart__wrapper-cart__wrapper-cart-tile">
          {cartMessage()}

          {products.cart_products?.map((product, index) => {
            return <CartTile key={index} cartProduct={product} />;
          })}
        </div>

        <div className="cart__wrapper-cart__wrapper-footer">
          {products.cart_products?.length > 0 && (
            <div className="cart__wrapper-cart__wrapper-footer__total">
              <p>Total</p>
              <span>{products.total_price}€</span>
            </div>
          )}

          <div className="cart__wrapper-cart__wrapper-footer__wrapper-checkout">
            <span>Proceder au paiement</span>
            <FontAwesomeIcon
              className="cart__wrapper-cart__wrapper-footer__wrapper-checkout__arrow"
              icon="long-arrow-alt-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
