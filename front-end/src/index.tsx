import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import LoginPage from "./Pages/LoginPage";
import AllUsersPage from "./Pages/authorized/AllUsersPage";
import UserDetailsPage from "./Pages/authorized/UserDetailsPage";
import AddUserPage from "./Pages/authorized/AddUserPage";
import RegisterPage from "./Pages/RegistrationPage";
import RecoverPasswordPage from "./Pages/RecoverPasswordPage";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Redirect exact from="/" to="/login" />
    </Switch>
    <Route exact path="/login/recover" component={RecoverPasswordPage} />
    <Route exact path="/register" component={RegisterPage} />
    <PrivateRoute exact path="/users" component={AllUsersPage} />
    <PrivateRoute exact path="/users/details" component={UserDetailsPage} />
    <PrivateRoute exact path="/users/add" component={AddUserPage} />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
