import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { TextField, Button } from "@material-ui/core";
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
  const [emailValue, setEmailValue] = useState<string>("");
  const [password1Value, setPassword1Value] = useState<string>("");
    const [password2Value, setPassword2Value] = useState<string>("");

  const createUser = () => {
    if (password1Value === password2Value) {
      fetch("/api/users/add", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: password1Value
        })
      }).then(res => {
        if (res.status === 201) {
          // TODO
        } else {
          // TODO
        }
      });
    } else {
      // TOOD
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
          error
          label={t("input.errorLabel")}
          defaultValue="Hello World"
          helperText={t("input.emailTakenMessage")}
          margin="normal"
          className={classes.inputField}
          onChange={e => setEmailValue((e.target as HTMLInputElement).value)}
        />

        <div>
          <b>{t("registrationPage.password1Label")}</b>
        </div>
        <TextField
          defaultValue="Hello World"
          margin="normal"
          type="password"
          className={classes.inputField}
          onChange={e =>
            setPassword1Value((e.target as HTMLInputElement).value)
          }
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
          onChange={e =>
            setPassword2Value((e.target as HTMLInputElement).value)
          }
        />

        <div>
          <Button variant="contained" color="primary" onClick={createUser}>
            {t("registrationPage.registrationButton")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
