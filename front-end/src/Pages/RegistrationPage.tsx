import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <MenuComponent />

      <div>{t("registrationPage.emailLabel")}</div>
      <TextField
        error
        id="filled-error-helper-text"
        label={t("input.errorLabel")}
        defaultValue="Hello World"
        helperText={t("input.emailTakenMessage")}
        margin="normal"
        variant="filled"
      />

      <div>{t("registrationPage.password1Label")}</div>
      <TextField
        id="filled-error-helper-text"
        defaultValue="Hello World"
        margin="normal"
        variant="filled"
        type="password"
      />
      <div>{t("registrationPage.password2Label")}</div>
      <TextField
        error
        id="filled-error-helper-text"
        label={t("input.errorLabel")}
        defaultValue="Hello World"
        helperText={t("input.passwordsDoNotMatchMessage")}
        margin="normal"
        variant="filled"
        type="password"
      />

      <div>
        <button id="login-btn">
          {t("registrationPage.registrationButton")}
        </button>
      </div>
    </>
  );
};

export default RegisterPage;
