import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LogoutComponent from "./LogoutComponent";
import { useTranslation } from "react-i18next";
import LanguageComponent from "./LanguageComponent";
import { Button, Snackbar, IconButton } from "@material-ui/core";

type NotificationComponentProps = {
  message: string;
  open: boolean;
  handleClose: () => void;
};

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  message,
  open,
  handleClose
}: NotificationComponentProps) => {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={<span id="message-id">{message}</span>}
    />
  );
};

export default NotificationComponent;
