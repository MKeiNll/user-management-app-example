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
      <button id="add-user-btn">Add user </button>
      <Link to="/users/details">
        <button>User details</button>
      </Link>
      <div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User email</TableCell>
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
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default UsersPage;