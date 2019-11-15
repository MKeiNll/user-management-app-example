import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import ErrorNotificationComponent from "./ErrorNotificationComponent";

const useStyles = makeStyles(() => ({
  logoutButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "120px",
    height: "100%",
    float: "right",
    "&:hover": {
      background: "#C9CEEA",
      color: "#3F51B5",
      cursor: "pointer"
    }
  }
}));

const LogoutComponent: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn")
  );
  const [errorOpen, setErrorOpen] = useState(false);

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      sessionStorage.setItem("userLoggedIn", isUserLoggedIn as string);
    } else {
      sessionStorage.removeItem("userLoggedIn");
    }
  }, [isUserLoggedIn]);

  const logoutUser = () => {
    fetch("/api/auth/logout", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.status === 200) {
        setIsUserLoggedIn(null);
      } else {
        handleErrorOpen();
      }
    });
  };

  return isUserLoggedIn ? (
    <>
      <div onClick={logoutUser} className={classes.logoutButton}>
        {t("menu.logoutLabel")}
      </div>
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default LogoutComponent;
