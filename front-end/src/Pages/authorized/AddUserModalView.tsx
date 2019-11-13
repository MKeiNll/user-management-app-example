import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 200,
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

          <div className="login-input">
            Email:
            <br />
            <input id="email-input" type="text" />
          </div>

          <div className="login-input">
            Password:
            <br />
            <input id="pwd-input" type="password" />
          </div>
          <div className="login-input">
            Repeat password:
            <br />
            <input id="pwd-input" type="password" />
          </div>

          <div>
            <button id="login-btn">Add new user</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUserModalView;
