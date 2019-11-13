import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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

const DeleteUserModalView: React.FC = () => {
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
        {t("usersPage.deleteUserButtonLabel")}
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          {t("usersPage.deleteUserModal.confirmationMessage")}
          <button>{t("usersPage.deleteUserModal.deleteButton")}</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUserModalView;
