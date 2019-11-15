import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../../Components/MenuComponent";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@material-ui/core";
import classes from "*.module.css";
import { makeStyles } from "@material-ui/styles";
import { jsxElement } from "@babel/types";
import DeleteUserModalView from "./DeleteUserModalView";
import AddUserModalView from "./AddUserModalView";
import UserDetailsModalView from "./UserDetailsModalView";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  table: {
    width: 800
  },
  tableContainer: {
    marginLeft: 200,
    marginTop: 50
  },
  tableRow: {
    height: 75
  }
});

type user = {
  email: string;
  logins: Date[];
  active: boolean;
};

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = React.useState<user[]>([]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const getUsers = () => {
    fetch("/api/users/all", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(json => {
        if (json !== null) {
          setUsers(json.users);
        } else {
          // TODO
        }
      });
  };

  const handleUserDeletion = (id: number) => {
    let usersCopy = users.slice();
    usersCopy.splice(id, 1);
    setUsers(usersCopy);
  };

  const handleUserCreation = (email: string) => {
    let usersCopy = users.slice();
    let logins: Date[] = [];
    let active = false;
    usersCopy.push({ email, logins, active });
    setUsers(usersCopy);
  };

  useEffect(() => {
    getUsers();
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
    </>
  );
};

export default UsersPage;
