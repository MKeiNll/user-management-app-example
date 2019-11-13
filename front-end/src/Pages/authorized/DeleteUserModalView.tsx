import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 100,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  },
  deleteButton: {
    marginTop: 25
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
      <Button variant="contained" onClick={handleOpen}>
        {t("usersPage.deleteUserButtonLabel")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          {t("usersPage.deleteUserModal.confirmationMessage")}
          <Button
            variant="contained"
            onClick={handleOpen}
            color="primary"
            className={classes.deleteButton}
          >
            {t("usersPage.deleteUserModal.deleteButton")}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUserModalView;
