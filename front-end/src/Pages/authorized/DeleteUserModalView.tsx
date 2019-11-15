import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import ErrorNotificationComponent from "../../Components/ErrorNotificationComponent";
import NotificationComponent from "../../Components/NotificationComponent";

const useStyles = makeStyles((theme) => ({
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
    margin: "auto",
  },
  deleteButton: {
    marginTop: 25,
  },
}));

interface IDeleteUserModalViewProps {
  id: number;
  handleDeletion: (id: number) => void;
}

const DeleteUserModalView: React.FC<IDeleteUserModalViewProps> = ({
  id,
  handleDeletion,
}: IDeleteUserModalViewProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationOpen = () => {
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const deleteUser = () => {
    fetch("/api/users/delete/" + id, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        handleDeletion(id);
        handleNotificationOpen();
        handleClose();
      } else {
        handleErrorOpen();
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
      <NotificationComponent
        handleClose={handleNotificationClose}
        open={notificationOpen}
        message={t("usersPage.deleteUserModal.userDeletedMessage")}
      />
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default DeleteUserModalView;
