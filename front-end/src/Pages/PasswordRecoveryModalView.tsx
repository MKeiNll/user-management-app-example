import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { Modal, Button, TextField } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 200,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  },
  inputField: {
    marginBottom: 25
  }
}));

const PasswordRecoveryModalView: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const recoverPassword = () => {
    setPasswordInputError("");
    fetch("/api/auth/recover", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue
      })
    }).then(res => {
      if (res.status === 200) {
        // TODO
      } else if (res.status === 409) {
        setPasswordInputError(t("input.wrongEmailMessage"));
      } else {
        // TODO
      }
    });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {t("usersPage.passwordRecoveryButton")}
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          {t("usersPage.passwordRecoveryModal.enterEmailMessage")}
          <br />
          <TextField
            error={passwordInputError !== ""}
            helperText={passwordInputError}
            margin="normal"
            className={classes.inputField}
            onChange={e => setEmailValue((e.target as HTMLInputElement).value)}
          />
          <Button variant="contained" color="primary" onClick={recoverPassword}>
            {t("usersPage.passwordRecoveryModal.sendPasswordButton")}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordRecoveryModalView;
