import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LogoutComponent from "./LogoutComponent";
import { useTranslation } from "react-i18next";
import LanguageComponent from "./LanguageComponent";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    alignItems: "stretch"
  },
  leftMenuBlock: {
    display: "flex",
    width: "50%"
  },
  rightMenuBlock: {
    width: "50%"
  },
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "160px",
    textDecoration: "none",
    color: "white"
  },
  activeNavlink: {
    color: "#3f51b5 !important",
    backgroundColor: "rgb(201, 206, 234)",
    fontWeight: "bold"
  }
}));

const MenuComponent: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [isUserLoggedIn] = useState(sessionStorage.getItem("userLoggedIn"));

  return isUserLoggedIn ? (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftMenuBlock}>
          <NavLink
            to="/users"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            {t("menu.manageUsersLabel")}
          </NavLink>
        </div>
        <div className={classes.rightMenuBlock}>
          <LogoutComponent />
          <LanguageComponent />
        </div>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftMenuBlock}>
          <NavLink
            to="/login"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            {t("menu.loginLabel")}
          </NavLink>
          <NavLink
            exact
            to="/register"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            {t("menu.registerLabel")}
          </NavLink>
        </div>
        <div className={classes.rightMenuBlock}>
          <LanguageComponent />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MenuComponent;
