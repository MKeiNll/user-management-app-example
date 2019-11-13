import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import PasswordRecoveryModalView from "./PasswordRecoveryModalView";
import { TextField } from "@material-ui/core";

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
      <div>Email:</div>
      <TextField
        error
        id="filled-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Wrong email."
        margin="normal"
        variant="filled"
        onChange={e => setUsernameValue((e.target as HTMLInputElement).value)}
      />

      <div>Password:</div>
      <TextField
        error
        id="filled-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Wrong password."
        margin="normal"
        variant="filled"
        type="password"
        onChange={e => setPasswordValue((e.target as HTMLInputElement).value)}
      />
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
    </>
  );
};

export default LoginPage;
