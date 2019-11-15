import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, TextField, Button } from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import NotificationComponent from "../../Components/NotificationComponent";
import ErrorNotificationComponent from "../../Components/ErrorNotificationComponent";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 350,
    height: 500,
    backgroundColor: "white",
    border: "2px solid #000",
    padding: "20px",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    margin: "auto"
  },
  openModalButton: {
    marginBottom: 25
  },
  inputField: {
    marginBottom: 25
  }
}));

type AddUserModalViewProps = {
  handleCreation: (email: string) => void;
};

const AddUserModalView: React.FC<AddUserModalViewProps> = ({
  handleCreation
}: AddUserModalViewProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [password1Value, setPassword1Value] = useState<string>("");
  const [password2Value, setPassword2Value] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<string>("");
  const [passwordInputError, setPasswordInputError] = useState<string>("");

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

  const createUser = () => {
    if (password1Value === password2Value) {
      setEmailInputError("");
      setPasswordInputError("");
      fetch("/api/users/add", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: password1Value
        })
      })
        .then(res => {
          if (res.status === 201) {
            handleCreation(emailValue);
            handleNotificationOpen();
            handleClose();
          } else if (res.status === 409) {
            setEmailInputError(t("input.emailTakenMessage"));
          } else {
            return res.json();
          }
          return null;
        })
        .then(errorJson => {
          if (errorJson) {
            let code = errorJson.error.code;
            if (code === "9001") {
              setEmailInputError(t("input.emailValidationErrorMessage"));
            } else if (code === "9002") {
              setPasswordInputError(t("input.passwordValidationMessage"));
            } else {
              handleErrorOpen();
            }
          }
        });
    } else {
      setPasswordInputError(t("input.passwordsDoNotMatchMessage"));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.openModalButton}
      >
        {t("usersPage.newUserButtonLabel")}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <div className="login-header">
            <h3>{t("usersPage.newUserModal.title")}</h3>
          </div>
          <div>
            <b> {t("usersPage.newUserModal.emailLabel")}</b>
          </div>
          <TextField
            error={emailInputError !== ""}
            helperText={emailInputError}
            margin="normal"
            className={classes.inputField}
            onChange={e => setEmailValue((e.target as HTMLInputElement).value)}
          />
          <div>
            <b> {t("usersPage.newUserModal.password1Label")}</b>
          </div>
          <TextField
            margin="normal"
            type="password"
            className={classes.inputField}
            onChange={e =>
              setPassword1Value((e.target as HTMLInputElement).value)
            }
          />
          <div>
            <b> {t("usersPage.newUserModal.password2Label")}</b>
          </div>
          <TextField
            error={passwordInputError !== ""}
            helperText={passwordInputError}
            margin="normal"
            type="password"
            className={classes.inputField}
            onChange={e =>
              setPassword2Value((e.target as HTMLInputElement).value)
            }
          />
          <div>
            <Button variant="contained" color="primary" onClick={createUser}>
              {t("usersPage.newUserModal.createButtonLabel")}
            </Button>
          </div>
        </div>
      </Modal>
      <NotificationComponent
        handleClose={handleNotificationClose}
        open={notificationOpen}
        message={t("usersPage.newUserModal.userCreatedMessage")}
      />
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default AddUserModalView;
