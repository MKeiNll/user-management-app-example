import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import PasswordRecoveryModalView from "./PasswordRecoveryModalView";
import { TextField } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
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
      <div>{t("loginPage.emailLabel")}</div>
      <TextField
        error
        id="filled-error-helper-text"
        label={t("input.errorLabel")}
        defaultValue="Hello World"
        helperText={t("input.wrongEmailMessage")}
        margin="normal"
        variant="filled"
        onChange={e => setUsernameValue((e.target as HTMLInputElement).value)}
      />

      <div>{t("loginPage.passwordLabel")}</div>
      <TextField
        error
        id="filled-error-helper-text"
        label={t("input.errorLabel")}
        defaultValue="Hello World"
        helperText={t("input.wrongPasswordMessage")}
        margin="normal"
        variant="filled"
        type="password"
        onChange={e => setPasswordValue((e.target as HTMLInputElement).value)}
      />
      <div>
        <button id="login-btn" onClick={loginUser}>
          {t("loginPage.loginButtonLabel")}
        </button>
      </div>

      <PasswordRecoveryModalView />
    </>
  );
};

export default LoginPage;
