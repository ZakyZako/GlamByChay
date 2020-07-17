import React from "react";
import { useDispatch } from "react-redux";
import SignUp from "./SignUp/SignUp";
import "./modal.scss";
import { toggleModal } from "../../actions/index";
import FormLogin from "./FormLogin/FormLogin";
import { useState } from "react";

const Modal = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="wrapper-modal">
      <div
        className="wrapper-modal__overlay"
        onClick={() => {
          dispatch(toggleModal(false));
        }}
      ></div>
      <div className="wrapper-modal__modal">
        {!isSignUp ? (
          <FormLogin setIsSignUp={setIsSignUp} />
        ) : (
          <SignUp setIsSignUp={setIsSignUp} />
        )}
      </div>
    </div>
  );
};

export default Modal;
