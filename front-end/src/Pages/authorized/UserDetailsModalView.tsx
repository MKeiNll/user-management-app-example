import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { StringifyOptions } from "querystring";
import ErrorNotificationComponent from "../../Components/ErrorNotificationComponent";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 450,
    overflowY: "auto",
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

type UserDetailsModalViewProps = {
  id: number;
  email: string;
};

const UserDetailsModalView: React.FC<UserDetailsModalViewProps> = ({
  id,
  email
}: UserDetailsModalViewProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [logins, setLogins] = useState<Date[]>([]);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleOpen = () => {
    getUserDetails();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const getUserDetails = () => {
    fetch("/api/users/logins/" + id, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(json => {
        if (json !== null) {
          setLogins(json);
        } else {
          handleErrorOpen();
        }
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        {t("usersPage.userDetailsButtonLabel")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <b>{t("usersPage.userDetailsModal.emailLabel")}</b>
          {email}
          <br /> <br />
          <b>{t("usersPage.userDetailsModal.loginsLabel")}</b>
          <ul>
            {logins.map((login, index) => (
              <li key={index}>{new Date(login).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </Modal>
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default UserDetailsModalView;
