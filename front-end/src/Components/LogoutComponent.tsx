import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const LogoutComponent: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn")
  );

  useEffect(() => {
    if (isUserLoggedIn) {
      sessionStorage.setItem("userLoggedIn", isUserLoggedIn as string);
    } else {
      sessionStorage.removeItem("userLoggedIn");
    }
  }, [isUserLoggedIn]);

  const logoutUser = () => {
    fetch("/api/auth/logout", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.status === 200) {
        setIsUserLoggedIn(null);
      }
    });
  };

  return isUserLoggedIn ? (
    <button onClick={logoutUser}>Logout</button>
  ) : (
    <Redirect to="/login" />
  );
};

export default LogoutComponent;
