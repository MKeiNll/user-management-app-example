import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LanguageComponent from "./LanguageComponent";
import LogoutComponent from "./LogoutComponent";

const useStyles = makeStyles(() => ({
  activeNavlink: {
    backgroundColor: "rgb(201, 206, 234)",
    color: "#3f51b5 !important",
    fontWeight: "bold",
  },
  leftMenuBlock: {
    display: "flex",
    width: "50%",
  },
  menuItem: {
    alignItems: "center",
    color: "white",
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    width: "160px",
  },
  rightMenuBlock: {
    width: "50%",
  },
  toolbar: {
    alignItems: "stretch",
    display: "flex",
  },
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
