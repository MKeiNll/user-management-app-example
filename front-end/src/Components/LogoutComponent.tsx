import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import ErrorNotificationComponent from "./ErrorNotificationComponent";

const useStyles = makeStyles(() => ({
  logoutButton: {
    "alignItems": "center",
    "display": "flex",
    "float": "right",
    "height": "100%",
    "&:hover": {
      background: "#C9CEEA",
      color: "#3F51B5",
      cursor: "pointer",
    },
    "justifyContent": "center",
    "width": "120px",
  },
}));

const LogoutComponent: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn"),
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
      headers: { "Content-Type": "application/json" },
      method: "get",
    }).then((res) => {
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
