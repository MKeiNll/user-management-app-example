import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import PasswordRecoveryModalView from "./PasswordRecoveryModalView";
import { TextField, Button } from "@material-ui/core";
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
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn")
  );

  useEffect(() => {
    if (isUserLoggedIn) {
      sessionStorage.setItem("userLoggedIn", isUserLoggedIn as string);
    }
  }, [isUserLoggedIn]);

  const loginUser = () => {
    setEmailInputError("");
    setPasswordInputError("");
    fetch("/api/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      })
    })
      .then(res => {
        if (res.status === 200) {
          setIsUserLoggedIn("true");
        } else if (res.status === 401) {
          return res.json();
        }
        return null;
      })
      .then(errorJson => {
        if (errorJson) {
          let code = errorJson.error.code;
          if (code === "9003") {
            setEmailInputError(t("input.wrongEmailMessage"));
          } else if (code === "9004") {
            setPasswordInputError(t("input.wrongPasswordMessage"));
          } else {
            // TODO
          }
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
          error={emailInputError !== ""}
          helperText={emailInputError}
          margin="normal"
          onChange={e => setEmailValue((e.target as HTMLInputElement).value)}
          className={classes.inputField}
        />

        <div>
          <b>{t("loginPage.passwordLabel")}</b>
        </div>
        <TextField
          error={passwordInputError !== ""}
          helperText={passwordInputError}
          margin="normal"
          type="password"
          onChange={e => setPasswordValue((e.target as HTMLInputElement).value)}
          className={classes.inputField}
        />
        <div>
          <Button variant="contained" color="primary" onClick={loginUser}>
            {t("loginPage.loginButtonLabel")}
          </Button>
        </div>
        <br />
        <PasswordRecoveryModalView />
      </div>
    </>
  );
};

export default LoginPage;
