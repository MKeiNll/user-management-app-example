import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import PasswordRecoveryModalView from "./PasswordRecoveryModalView";
import { TextField } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  inputContainer: {
    marginLeft: 200,
    marginTop: 50
  },
  inputField: {
    marginBottom: 25
  }
}));

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
    const classes = useStyles();
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
      <div className={classes.inputContainer}>
        <div>
          <b>{t("loginPage.emailLabel")}</b>
        </div>
        <TextField
          error
          label={t("input.errorLabel")}
          defaultValue="Hello World"
          helperText={t("input.wrongEmailMessage")}
          margin="normal"
          onChange={e => setUsernameValue((e.target as HTMLInputElement).value)}
          className={classes.inputField}
        />

        <div>
          <b>{t("loginPage.passwordLabel")}</b>
        </div>
        <TextField
          error
          label={t("input.errorLabel")}
          defaultValue="Hello World"
          helperText={t("input.wrongPasswordMessage")}
          margin="normal"
          type="password"
          onChange={e => setPasswordValue((e.target as HTMLInputElement).value)}
          className={classes.inputField}
        />
        <div>
          <button id="login-btn" onClick={loginUser}>
            {t("loginPage.loginButtonLabel")}
          </button>
        </div>

        <PasswordRecoveryModalView />
      </div>
    </>
  );
};

export default LoginPage;
