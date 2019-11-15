import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorNotificationComponent from "../../Components/ErrorNotificationComponent";
import MenuComponent from "../../Components/MenuComponent";
import AddUserModalView from "./AddUserModalView";
import DeleteUserModalView from "./DeleteUserModalView";
import UserDetailsModalView from "./UserDetailsModalView";

const useStyles = makeStyles({
  table: {
    width: 1000,
  },
  tableContainer: {
    marginLeft: 200,
    marginTop: 50,
  },
  tableRow: {
    height: 75,
  },
});

interface IUser {
  email: string;
  active: boolean;
}

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [errorOpen, setErrorOpen] = useState(false);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleUserDeletion = (id: number) => {
    const usersCopy = users.slice();
    usersCopy.splice(id, 1);
    setUsers(usersCopy);
  };

  const handleUserCreation = (email: string) => {
    const usersCopy = users.slice();
    const active = false;
    usersCopy.push({ email, active });
    setUsers(usersCopy);
  };

  useEffect(() => {
    fetch("/api/users/all", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((json) => {
        if (json !== null) {
          setUsers(json.users);
        } else {
          handleErrorOpen();
        }
      });
  }, []);

  return (
    <>
      <MenuComponent />
      <div className={classes.tableContainer}>
        <AddUserModalView handleCreation={handleUserCreation} />
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>{t("usersPage.tableIdLabel")}</b>
                </TableCell>
                <TableCell>
                  <b>{t("usersPage.tableEmailLabel")}</b>
                </TableCell>
                <TableCell>
                  <b>{t("usersPage.tableVerifiedLabel")}</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell component="th" scope="row">
                      {users.indexOf(user)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.active
                        ? t("usersPage.tableYesLabel")
                        : t("usersPage.tableNoLabel")}
                    </TableCell>
                    <TableCell align="right">
                      <UserDetailsModalView
                        email={user.email}
                        id={users.indexOf(user)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <DeleteUserModalView
                        id={users.indexOf(user)}
                        handleDeletion={handleUserDeletion}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 75 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            className={classes.table}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={t("table.rowsPerPageLabel")}
            labelDisplayedRows={({ from, to, count }) => {
              return (
                t("table.displayedRowsLabel1") +
                from +
                t("table.displayedRowsLabel2") +
                to +
                t("table.displayedRowsLabel3") +
                count +
                t("table.displayedRowsLabel4")
              );
            }}
          />
        </div>
      </div>
      <ErrorNotificationComponent
        open={errorOpen}
        handleClose={handleErrorClose}
      />
    </>
  );
};

export default UsersPage;
