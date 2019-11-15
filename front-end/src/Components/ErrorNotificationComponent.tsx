import {
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LanguageComponent from "./LanguageComponent";
import LogoutComponent from "./LogoutComponent";

const useStyles = makeStyles(() => ({
  errorNotification: {
    backgroundColor: "#D32F2F",
  },
}));

interface NotificationComponentProps {
  open: boolean;
  handleClose: () => void;
}

const ErrorNotificationComponent: React.FC<NotificationComponentProps> = ({
  open,
  handleClose,
}: NotificationComponentProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
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
