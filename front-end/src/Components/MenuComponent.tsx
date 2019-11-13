import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LogoutComponent from "./LogoutComponent";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  toolbar: {
    alignItems: "stretch"
  },
  leftMenuBlock: {
    display: "flex",
    float: "left"
  },
  rightMenuBlock: {
    float: "right"
  },
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "140px"
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
      </Toolbar>
    </AppBar>
  );
};

export default MenuComponent;
