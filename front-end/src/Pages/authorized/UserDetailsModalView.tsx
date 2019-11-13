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

const UserDetailsModalView: React.FC = () => {
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
        {t("usersPage.userDetailsButtonLabel")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          {t("usersPage.userDetailsModal.emailLabel")}
          <br />
          {t("usersPage.userDetailsModal.loginsLabel")}
          <br />
        </div>
      </Modal>
    </>
  );
};

export default UserDetailsModalView;
