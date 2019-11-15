import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorNotificationComponent from "../Components/ErrorNotificationComponent";
import MenuComponent from "../Components/MenuComponent";
import NotificationComponent from "../Components/NotificationComponent";

const useStyles = makeStyles(() => ({
  inputContainer: {
    marginLeft: 200,
    marginTop: 50,
  },
  inputField: {
    marginBottom: 25,
  },
}));

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [password1Value, setPassword1Value] = useState<string>("");
  const [password2Value, setPassword2Value] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");
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

  const clearInputValues = () => {
    setEmailValue("");
    setPassword1Value("");
    setPassword2Value("");
  };

  const createUser = () => {
    if (password1Value === password2Value) {
      setEmailInputError("");
      setPasswordInputError("");
      fetch("/api/users/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: password1Value,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            handleNotificationOpen();
            clearInputValues();
          } else if (res.status === 409) {
            setEmailInputError(t("input.emailTakenMessage"));
          } else {
            return res.json();
          }
          return null;
        })
        .then((errorJson) => {
          if (errorJson) {
            const code = errorJson.error.code;
            if (code === "9001") {
              setEmailInputError(t("input.emailValidationErrorMessage"));
            } else if (code === "9002") {
              setPasswordInputError(t("input.passwordValidationMessage"));
            } else {
              handleErrorOpen();
            }
          }
        });
    } else {
      setPasswordInputError(t("input.passwordsDoNotMatchMessage"));
    }
  };

  return (
    <>
      <MenuComponent />

      <div className={classes.inputContainer}>
        <div>
          <b>{t("registrationPage.emailLabel")}</b>
        </div>
        <TextField
          error={emailInputError !== ""}
          helperText={emailInputError}
          margin="normal"
          className={classes.inputField}
          onChange={(e) => setEmailValue((e.target as HTMLInputElement).value)}
          value={emailValue}
        />

        <div>
          <b>{t("registrationPage.password1Label")}</b>
        </div>
        <TextField
          margin="normal"
          type="password"
          className={classes.inputField}
          onChange={(e) =>
            setPassword1Value((e.target as HTMLInputElement).value)
          }
          value={password1Value}
        />
        <div>
          <b>{t("registrationPage.password2Label")}</b>
        </div>
        <TextField
          error={passwordInputError !== ""}
          helperText={passwordInputError}
          margin="normal"
          className={classes.inputField}
          type="password"
          onChange={(e) =>
            setPassword2Value((e.target as HTMLInputElement).value)
          }
          value={password2Value}
        />

        <div>
          <Button variant="contained" color="primary" onClick={createUser}>
            {t("registrationPage.registrationButton")}
          </Button>
        </div>
      </div>

      <NotificationComponent
        handleClose={handleNotificationClose}
        open={notificationOpen}
        message={t("registrationPage.userRegisteredMessage")}
      />
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default RegisterPage;
