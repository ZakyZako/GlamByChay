import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toggleModal, errorMessage, successMessage } from "../../../actions";
import "./signUp.scss";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const registerFormErrorMessage = useSelector(
    (state) => state.apiResponse.errorMessage
  );

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [errorMessageVerification, setErrorMessageVerification] = useState(
    null
  );

  const errorPasswordVerification = (event) => {
    setPasswordVerification(event.target.value);
    if (event.target.value === passwordOne) {
      return setErrorMessageVerification(null);
    } else {
      return setErrorMessageVerification(
        "Les mots de passe ne sont pas identiques."
      );
    }
  };

  const createUser = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_KEY}/api/user/register`, {
        email: email,
        username: username,
        plainPassword: {
          first: passwordOne,
          second: passwordVerification,
        },
      })
      .then(() => {
        props.setIsSignUp(false);
        dispatch(errorMessage(null));
        dispatch(
          successMessage("Ton compte a été crée, tu peux te connecter !")
        );
      })
      .catch((error) => {
        dispatch(errorMessage(error.response.data.email));
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          createUser(event);
        }}
      >
        <div className="title">
          <h2>Créer un compte</h2>
        </div>
        <FontAwesomeIcon
          className="cross-icon"
          onClick={() => {
            dispatch(toggleModal(false));
          }}
          icon="times"
        />
        <p className="error-message">
          {registerFormErrorMessage}
          {errorMessageVerification}
        </p>

        <div className="wrapper-title-input">
          <label className="wrapper-title-input__title-input">Username</label>
        </div>

        <input
          className="input"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <div className="wrapper-title-input">
          <label className="wrapper-title-input__title-input">
            Adresse email
          </label>
        </div>

        <input
          className="input"
          type="email"
          value={email}
          onChange={(event) => {
            setErrorMessageVerification("");
            setEmail(event.target.value);
          }}
        />

        <div className="wrapper-title-input">
          <label className=" wrapper-title-input__title-input">
            Mot de passe
          </label>
        </div>

        <input
          className="input"
          type="password"
          value={passwordOne}
          onChange={(event) => {
            setPasswordOne(event.target.value);
          }}
        />

        <div className="wrapper-title-input">
          <label className="wrapper-title-input__title-input">
            Confirmer le mot de passe
          </label>
        </div>

        <input
          className="input"
          type="password"
          value={passwordVerification}
          onChange={(event) => {
            errorPasswordVerification(event);
          }}
        />
        <div className="footer-signup">
          <button className="footer-signup__btn-submit-signup">
            Créer mon Compte Personnel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
