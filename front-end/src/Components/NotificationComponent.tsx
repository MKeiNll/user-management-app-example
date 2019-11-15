import { Button, IconButton, Snackbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LanguageComponent from "./LanguageComponent";
import LogoutComponent from "./LogoutComponent";

interface INotificationComponentProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}

const NotificationComponent: React.FC<INotificationComponentProps> = ({
  message,
  open,
  handleClose,
}: INotificationComponentProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={<span id="message-id">{message}</span>}
    />
  );
};

export default NotificationComponent;
