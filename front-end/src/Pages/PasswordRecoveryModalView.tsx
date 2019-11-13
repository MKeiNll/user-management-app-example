import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { Modal } from "@material-ui/core";
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
  }
}));

const PasswordRecoveryModalView: React.FC = () => {
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
      <button onClick={handleOpen}>
        {t("usersPage.passwordRecoveryButton")}
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          {t("usersPage.passwordRecoveryModal.enterEmailMessage")}
          <br />
          <input id="email-input" type="text" />
          <button id="login-btn">
            {t("usersPage.passwordRecoveryModal.sendPasswordButton")}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordRecoveryModalView;
