import { Button, IconButton, Snackbar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LanguageComponent from "./LanguageComponent";
import LogoutComponent from "./LogoutComponent";

interface NotificationComponentProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  message,
  open,
  handleClose,
}: NotificationComponentProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={<span id="message-id">{message}</span>}
    />
  );
};

export default NotificationComponent;
