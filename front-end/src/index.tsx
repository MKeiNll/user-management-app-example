import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, MemoryRouter } from "react-router";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import LoginPage from "./Pages/LoginPage";
import AllUsersPage from "./Pages/authorized/AllUsersPage";
import RegisterPage from "./Pages/RegistrationPage";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import "./i18n";

ReactDOM.render(
  <MemoryRouter>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/users" component={AllUsersPage} />
    <Redirect exact from="/" to="/login" />
  </MemoryRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
