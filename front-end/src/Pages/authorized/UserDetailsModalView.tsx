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

const UserDetailsModalView: React.FC = () => {
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
      <button onClick={handleOpen}>User details</button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          Email: asfd@johnatan.co.uk
          <br />
          User logins:
          <br />
          <div>15.11.2015</div>
          <br />
          <div>15.11.2016</div>
          <br />
          <div>15.11.2017</div>
          <br />
        </div>
      </Modal>
    </>
  );
};

export default UserDetailsModalView;
