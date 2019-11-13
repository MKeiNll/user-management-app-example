import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
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

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <MenuComponent />

      <div className={classes.inputContainer}>
        <div>
          <b>{t("registrationPage.emailLabel")}</b>
        </div>
        <TextField
          error
          label={t("input.errorLabel")}
          defaultValue="Hello World"
          helperText={t("input.emailTakenMessage")}
          margin="normal"
          className={classes.inputField}
        />

        <div>
          <b>{t("registrationPage.password1Label")}</b>
        </div>
        <TextField
          defaultValue="Hello World"
          margin="normal"
          type="password"
          className={classes.inputField}
        />
        <div>
          <b>{t("registrationPage.password2Label")}</b>
        </div>
        <TextField
          error
          label={t("input.errorLabel")}
          defaultValue="Hello World"
          helperText={t("input.passwordsDoNotMatchMessage")}
          margin="normal"
          className={classes.inputField}
          type="password"
        />

        <div>
          <button id="login-btn">
            {t("registrationPage.registrationButton")}
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
