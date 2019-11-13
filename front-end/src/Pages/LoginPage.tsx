import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import PasswordRecoveryModalView from "./PasswordRecoveryModalView";

const LoginPage: React.FC = () => {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn")
  );

  useEffect(() => {
    if (isUserLoggedIn) {
      sessionStorage.setItem("userLoggedIn", isUserLoggedIn as string);
    }
  }, [isUserLoggedIn]);

  const loginUser = () => {
    fetch("/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: usernameValue,
        password: passwordValue
      })
    }).then(res => {
      if (res.status === 200) {
        setIsUserLoggedIn("true");
      }
    });
  };
  
  return isUserLoggedIn ? (
    <Redirect to="/users" />
  ) : (
    <>
      <MenuComponent />
      <div className="login-block">
        <div className="login-input">
          Email:
          <br />
          <input
            id="email-input"
            value={usernameValue}
            onChange={e =>
              setUsernameValue((e.target as HTMLInputElement).value)
            }
            type="text"
          />
        </div>

        <div className="login-input">
          Password:
          <br />
          <input
            id="pwd-input"
            value={passwordValue}
            onChange={e =>
              setPasswordValue((e.target as HTMLInputElement).value)
            }
            type="password"
          />
        </div>

        <div>
          <button id="login-btn" onClick={loginUser}>
            Login
          </button>
        </div>

        <PasswordRecoveryModalView />

        <div className="default-login-user">
          // Default admin user (Email: "sean.maxwell@gmail.com", Password:
          "Password@1")
        </div>
      </div>
    </>
  );
};

export default LoginPage;
