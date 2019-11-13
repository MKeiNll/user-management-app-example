import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, TextField } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 600,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  }
}));

const AddUserModalView: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>Add new user</button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className="login-header">Add new user</div>
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
            <button id="login-btn">Add new user</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModalView;
