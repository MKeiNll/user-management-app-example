import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";
import { TextField } from "@material-ui/core";

const RegisterPage: React.FC = () => {
  return (
    <>
      <MenuComponent />

      <div>Email:</div>
      <TextField
        error
        id="filled-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Email taken."
        margin="normal"
        variant="filled"
      />

      <div>Password:</div>
      <TextField
        id="filled-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Email taken."
        margin="normal"
        variant="filled"
        type="password"
      />
      <div>Repeat password:</div>
      <TextField
        error
        id="filled-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Passwords do not match."
        margin="normal"
        variant="filled"
        type="password"
      />

      <div>
        <button id="login-btn">Register</button>
      </div>
    </>
  );
};

export default RegisterPage;
