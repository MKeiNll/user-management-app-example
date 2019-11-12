import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import MenuComponent from "../../Components/MenuComponent";

const UserDetailsPage: React.FC = () => {
  return (
    <>
      <MenuComponent />
      <div>"User details"</div>
    </>
  );
};

export default UserDetailsPage;
