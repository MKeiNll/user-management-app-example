import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../../Components/MenuComponent";

const UserDetailsPage: React.FC = () => {
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
          Password again:
          <br />
          <input id="pwd-input" type="password" />
        </div>

        <div>
          <button id="login-btn">Add new user</button>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPage;