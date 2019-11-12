import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import MenuComponent from "../../Components/MenuComponent";

const UsersPage: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const logoutUser = () => {
    fetch("/api/auth/logout", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.status === 200) {
        setLoginStatus(false);
        sessionStorage.removeItem("userLoggedIn");
      }
    });
  };

  return loginStatus ? (
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
        <div>
          <button id="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
      <div className="users-column">
        <div className="column-header">Users:</div>
        <div id="all-users-anchor"></div>
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default UsersPage;
