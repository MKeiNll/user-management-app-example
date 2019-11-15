import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import "./index.css";
import AllUsersPage from "./Pages/authorized/AllUsersPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegistrationPage";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/users" component={AllUsersPage} />
    <Redirect exact from="/" to="/login" />
  </BrowserRouter>,
  document.getElementById("root"),
);

serviceWorker.unregister();
