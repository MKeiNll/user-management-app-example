import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  menuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "180px",
    height: "100%",
    float: "right",
    "&:hover": {
      background: "#C9CEEA",
      color: "#3F51B5",
      cursor: "pointer"
    }
  }
}));

const LanguageComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div
      onClick={() => changeLanguage(i18n.language === "eng" ? "est" : "eng")}
      className={classes.menuItem}
    >
      {t("menu.languageLabel")}
    </div>
  );
};

export default LanguageComponent;
