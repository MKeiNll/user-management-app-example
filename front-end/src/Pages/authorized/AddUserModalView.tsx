import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, TextField } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 600,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  }
}));

const AddUserModalView: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>{t("usersPage.newUserButtonLabel")}</button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className="login-header">
            {t("usersPage.newUserModal.title")}
          </div>
          <div>{t("usersPage.newUserModal.emailLabel")}</div>
          <TextField
            error
            id="filled-error-helper-text"
            label={t("input.errorLabel")}
            defaultValue="Hello World"
            helperText={t("input.emailTakenMessage")}
            margin="normal"
            variant="filled"
          />
          <div>{t("usersPage.newUserModal.password1Label")}</div>
          <TextField
            id="filled-error-helper-text"
            defaultValue="Hello World"
            margin="normal"
            variant="filled"
            type="password"
          />
          <div>{t("usersPage.newUserModal.password2Label")}</div>
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
              {t("usersPage.newUserModal.createButtonLabel")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModalView;
