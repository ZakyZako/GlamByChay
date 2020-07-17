import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import Modal from "../../components/Modal/Modal";
import { toggleModal, toggleCart } from "../../actions/index";
import { logOutUser } from "../../actions/index";
import "./header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  let userToken = useSelector((state) => state.userDataFromToken.token);

  const renderAuthentication = () => {
    if (userToken) {
      return "Deconnexion";
    } else {
      return "Connexion";
    }
  };

  const onClickAuthentication = () => {
    if (!userToken) {
      return dispatch(toggleModal(true));
    } else {
      return dispatch(logOutUser());
    }
  };

  return (
    <div className="header">
      {modalOpen && <Modal />}
      <Cart />
      <div className="header__top-bar">
        <span>Livraison gratuite à partir de 50€</span>
      </div>
      <div className="header__menu">
        <span className="header__menu__button" onClick={onClickAuthentication}>
          <p className="header__menu__cursor-pointer">
            {renderAuthentication()}
          </p>
        </span>
        <Link to={"/"} className="header__menu__title">
          Glam By Chay
        </Link>
        <span
          onClick={() => {
            dispatch(toggleCart(true));
          }}
          className="header__menu__button"
        >
          Mon panier
        </span>
      </div>
    </div>
  );
};

export default Header;
