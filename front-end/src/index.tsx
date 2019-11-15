import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, MemoryRouter } from "react-router";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import LoginPage from "./Pages/LoginPage";
import AllUsersPage from "./Pages/authorized/AllUsersPage";
import RegisterPage from "./Pages/RegistrationPage";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/users" component={AllUsersPage} />
    <Redirect exact from="/" to="/login" />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
