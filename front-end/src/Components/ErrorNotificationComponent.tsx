import {
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles(() => ({
  errorNotification: {
    backgroundColor: "#D32F2F",
  },
}));

interface INotificationComponentProps {
  open: boolean;
  handleClose: () => void;
}

const ErrorNotificationComponent: React.FC<INotificationComponentProps> = ({
  open,
  handleClose,
}: INotificationComponentProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <SnackbarContent
        className={classes.errorNotification}
        message={t("unexpectedError")}
      />
    </Snackbar>
  );
};

export default ErrorNotificationComponent;
