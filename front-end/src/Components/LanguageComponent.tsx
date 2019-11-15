import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
  menuItem: {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "width": "180px",
    "height": "100%",
    "float": "right",
    "&:hover": {
      background: "#C9CEEA",
      color: "#3F51B5",
      cursor: "pointer",
    },
  },
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
