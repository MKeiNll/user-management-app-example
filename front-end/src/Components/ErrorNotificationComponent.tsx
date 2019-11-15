import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LogoutComponent from "./LogoutComponent";
import { useTranslation } from "react-i18next";
import LanguageComponent from "./LanguageComponent";
import {
  Button,
  Snackbar,
  IconButton,
  SnackbarContent
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  errorNotification: {
    backgroundColor: "#D32F2F"
  }
}));

type NotificationComponentProps = {
  open: boolean;
  handleClose: () => void;
};

const ErrorNotificationComponent: React.FC<NotificationComponentProps> = ({
  open,
  handleClose
}: NotificationComponentProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <SnackbarContent
        className={classes.errorNotification}
        message={<span id="message-id">{t("unexpectedError")}</span>}
      />
    </Snackbar>
  );
};

export default ErrorNotificationComponent;
