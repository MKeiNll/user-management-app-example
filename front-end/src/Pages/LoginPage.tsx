import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import queryString from "query-string";
import React, { ComponentProps, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import ErrorNotificationComponent from "../Components/ErrorNotificationComponent";
import MenuComponent from "../Components/MenuComponent";
import NotificationComponent from "../Components/NotificationComponent";
import PasswordRecoveryModalView from "./PasswordRecoveryModalView";

const useStyles = makeStyles(({
  inputContainer: {
    marginLeft: 200,
    marginTop: 50,
  },
  inputField: {
    marginBottom: 25,
  },
}));

const LoginPage: React.FC<ComponentProps<any>> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn"),
  );
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleNotificationOpen = () => {
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      sessionStorage.setItem("userLoggedIn", isUserLoggedIn as string);
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    if (params) {
      if (params.hash) {
        fetch("/api/auth/validate", {
          body: JSON.stringify({
            hash: params.hash
          }),
          headers: { "Content-Type": "application/json" },
          method: "post"
        }).then(res => {
          if (res.status === 200) {
            handleNotificationOpen();
          } else {
            handleErrorOpen();
          }
        });
      }
    }
  }, [props.location.search]);

  const loginUser = () => {
    setEmailInputError("");
    setPasswordInputError("");
    fetch("/api/auth/login", {
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
      headers: { "Content-Type": "application/json" },
      method: "post",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsUserLoggedIn("true");
        } else if (res.status === 401) {
          return res.json();
        }
        return null;
      })
      .then((errorJson) => {
        if (errorJson) {
          const code = errorJson.error.code;
          if (code === "9003") {
            setEmailInputError(t("input.wrongEmailMessage"));
          } else if (code === "9004") {
            setPasswordInputError(t("input.wrongPasswordMessage"));
          } else if (code === "9005") {
            setEmailInputError(t("input.emailNotVerifiedErrorMessage"));
          } else {
            handleErrorOpen();
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
          onChange={(e) => setEmailValue((e.target as HTMLInputElement).value)}
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
          onChange={(e) => setPasswordValue((e.target as HTMLInputElement).value)}
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
      <NotificationComponent
        handleClose={handleNotificationClose}
        open={notificationOpen}
        message={t("loginPage.emailVerifiedMessage")}
      />
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default LoginPage;
