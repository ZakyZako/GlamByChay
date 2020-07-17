import React from "react";
import { Link } from "react-router-dom";
import "./productItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, toggleCart } from "../../../actions/index";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userDataFromToken.token);
  return (
    <div className="product-item">
      <Link to={"/product/" + props.product.id}>
        <img
          className="product-item__img-product"
          src={props.product.img_path}
          alt="img-product"
        />
      </Link>
      <div className="product-item__wrapper-desc">
        <h2>{props.product.name}</h2>

        <div className="product-item__wrapper-desc__price">
          <span>{props.product.price}€</span>
        </div>
        <p
          onClick={() => {
            dispatch(addProduct(props.product.id, token));
            dispatch(toggleCart(true));
          }}
          className="product-item__wrapper-desc__add_to_card"
        >
          Ajouter au panier
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
