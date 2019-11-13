import React, { Component, FunctionComponent } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

type PrivateRouteProps = {
  exact?: boolean;
  path: string;
  component: FunctionComponent<{}>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const isLoggedIn = sessionStorage.getItem("userLoggedIn");

  if (!isLoggedIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
