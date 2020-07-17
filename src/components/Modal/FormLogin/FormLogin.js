import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleModal, connection, errorMessage } from "../../../actions";

import "./formLogin.scss";

const FormLogin = (props) => {
  const [isCheck, setIsCheck] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const connectionErrorMessage = useSelector(
    (state) => state.apiResponse.errorMessage
  );
  const connectionSuccessMessage = useSelector(
    (state) => state.apiResponse.successMessage
  );

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(connection({ mail, password, stayConnected: isCheck }));
  };

  return (
    <div>
      <div className="title-form-connection">
        <h2 className="">CONNEXION</h2>
        <FontAwesomeIcon
          className="title-form-connection__cross-icon"
          onClick={() => {
            dispatch(toggleModal(false));
          }}
          icon="times"
        />
      </div>

      <form
        onSubmit={(event) => {
          handleLogin(event);
        }}
      >
        <div className="form-login">
          <div className="form-login__wrapper">
            <p className="form-login__wrapper__error-message">
              {connectionErrorMessage}
            </p>
            <p className="form-login__wrapper__success-message">
              {connectionSuccessMessage}
            </p>
            <label className="form-login__wrapper__title-input">
              Adresse email
            </label>

            <input
              className="form-login__wrapper__input"
              type="email"
              name="email"
              value={mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
            />
          </div>

          <div className="form-login__wrapper">
            <label className="form-login__wrapper__title-input">Password</label>

            <input
              className="form-login__wrapper__input"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>
          <button className="form-login__btn-connect" type="submit">
            Se connecter
          </button>
        </div>
      </form>

      <div className="wrapper-footer">
        <div className="wrapper-footer__wrapper-checkbox">
          <input
            className="wrapper-footer__wrapper-checkbox__checkbox"
            onChange={(event) => setIsCheck(event.target.checked)}
            checked={isCheck}
            type="checkbox"
          />
          <label>Restez connecté </label>
        </div>
        <div>
          <span className="wrapper-footer__text">
            Vous n'avez pas de compte ?
          </span>
          <span
            className="wrapper-footer__signup"
            onClick={() => {
              props.setIsSignUp(true);
              dispatch(errorMessage(null));
            }}
          >
            Créer un compte
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
