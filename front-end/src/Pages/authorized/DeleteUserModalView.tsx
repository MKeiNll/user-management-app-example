import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 100,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  },
  deleteButton: {
    marginTop: 25
  }
}));

type DeleteUserModalViewProps = {
  id: number;
  handleDeletion: (id: number) => void;
};

const DeleteUserModalView: React.FC<DeleteUserModalViewProps> = ({
  id,
  handleDeletion
}: DeleteUserModalViewProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = () => {
    fetch("/api/users/delete/" + id, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.status === 200) {
        handleDeletion(id);
      } else {
        // TODO
      }
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        {t("usersPage.deleteUserButtonLabel")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          {t("usersPage.deleteUserModal.confirmationMessage")}
          <Button
            variant="contained"
            color="primary"
            className={classes.deleteButton}
            onClick={deleteUser}
          >
            {t("usersPage.deleteUserModal.deleteButton")}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUserModalView;
