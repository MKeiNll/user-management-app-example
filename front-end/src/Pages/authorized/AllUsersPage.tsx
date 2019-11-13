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
  }
});

const rows = [
  { email: "Anthony" },
  { email: "Mark1" },
  { email: "Mark2" },
  { email: "Mark3" },
  { email: "Mark4" },
  { email: "Mark5" },
  { email: "Mark6" },
  { email: "Mark78" },
  { email: "Mark8" },
  { email: "Mark9" },
  { email: "Mark0" },
  { email: "Mark-" },
  { email: "Mark" },
  { email: "Ma=rk" },
  { email: "Ma5rk" },
  { email: "M0ark" }
];

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <>
      <MenuComponent />
      <AddUserModalView />
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{t("usersPage.tableEmailLabel")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">
                    <UserDetailsModalView />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteUserModalView />
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          className={classes.table}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
    </>
  );
};

export default UsersPage;
