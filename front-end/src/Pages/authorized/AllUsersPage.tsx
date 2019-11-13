import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../../Components/MenuComponent";

const UsersPage: React.FC = () => {
  return (
    <>
      <MenuComponent />
      <div className="users-column add-user-col">
        <div className="column-header">Add User:</div>
        <div>
          <input id="name-input" placeholder="Name" />
        </div>
        <div>
          <input id="email-input" placeholder="Email" />
        </div>
        <div>
          <button id="add-user-btn">Add</button>
        </div>
        <Link to="/users/details">
          <button>User details</button>
        </Link>
      </div>
      <div className="users-column">
        <div className="column-header">Users:</div>
        <div id="all-users-anchor"></div>
      </div>
    </>)
};

export default UsersPage;
