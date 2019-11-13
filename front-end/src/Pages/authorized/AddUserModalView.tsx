import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, TextField, Button } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 500,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  },
  openModalButton: {
    marginBottom: 25
  },
  inputField: {
    marginBottom: 25
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.openModalButton}
      >
        {t("usersPage.newUserButtonLabel")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <div className="login-header">
            <h3>{t("usersPage.newUserModal.title")}</h3>
          </div>
          <div>
            <b> {t("usersPage.newUserModal.emailLabel")}</b>
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
            <b> {t("usersPage.newUserModal.password1Label")}</b>
          </div>
          <TextField
            defaultValue="Hello World"
            margin="normal"
            type="password"
            className={classes.inputField}
          />
          <div>
            <b> {t("usersPage.newUserModal.password2Label")}</b>
          </div>
          <TextField
            error
            label={t("input.errorLabel")}
            defaultValue="Hello World"
            helperText={t("input.passwordsDoNotMatchMessage")}
            margin="normal"
            type="password"
            className={classes.inputField}
          />
          <div>
            <Button variant="contained" color="primary">
              {t("usersPage.newUserModal.createButtonLabel")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModalView;
