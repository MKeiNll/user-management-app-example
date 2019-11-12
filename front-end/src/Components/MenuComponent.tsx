import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  toolbar: {
    alignItems: "stretch"
  },
  menuContentBlock: {
    display: "flex",
    float: "left"
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
  const classes = useStyles();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn")
  );

  useEffect(() => {
    setIsUserLoggedIn(sessionStorage.getItem("userLoggedIn"));
  }, [sessionStorage.getItem("userLoggedIn")]);

  return isUserLoggedIn ? (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.menuContentBlock}>
          <NavLink
            to="/users"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            Users
          </NavLink>
          <NavLink
            exact
            to="/add"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            Add User
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <div className={classes.menuContentBlock}>
          <NavLink
            to="/login"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            Login
          </NavLink>
          <NavLink
            exact
            to="/register"
            className={classes.menuItem}
            activeClassName={classes.activeNavlink}
          >
            Register
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MenuComponent;
