import React from "react";
import "./product.scss";
import { string, number } from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, toggleCart } from "../../actions/index";

const Product = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userDataFromToken.token);
  const [count, setCount] = useState(1);

  const decrementCheck = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="product">
      <div className="product__wrapper-img">
        <img
          className="product__wrapper-img__img"
          src={props.product.img_path}
          alt="img-product"
        />
      </div>
      <div className="product__info">
        <div className="product__info__title">
          <h2>{props.product.name}</h2>
        </div>
        <div className="product__info__price">
          <span>{props.product.price} €</span>
        </div>
        <div className="product__info__quantity">
          <span>Quantité </span>
          <div className="product__info__quantity__wrapper-button">
            <span
              className="product__info__quantity__wrapper-button__button"
              onClick={decrementCheck}
            >
              -
            </span>
            <span>{count}</span>
            <span
              className="product__info__quantity__wrapper-button__button"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </span>
          </div>
        </div>
        <span
          onClick={() => {
            dispatch(addProduct(props.product.id, token, count));
            dispatch(toggleCart(true));
          }}
          className="product__info__submit"
        >
          AJOUTER AU PANIER
        </span>

        <span className="product__info__description">Description</span>
        <p>{props.product.description}</p>
      </div>
    </div>
  );
};

Product.propTypes = {
  img_path: string,
  name: string,
  price: number,
  description: string,
};

export default Product;
