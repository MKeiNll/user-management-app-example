import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";

const RegisterPage: React.FC = () => {
  return (
    <>
      <MenuComponent />
      <div className="login-block">
        <div className="login-header">Login</div>

        <div className="login-input">
          Email:
          <br />
          <input id="email-input" type="text" />
        </div>

        <div className="login-input">
          Password:
          <br />
          <input id="pwd-input" type="password" />
        </div>
        <div className="login-input">
          Repeat password:
          <br />
          <input id="pwd-input" type="password" />
        </div>

        <div>
          <button id="login-btn">Register</button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
