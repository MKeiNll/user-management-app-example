import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const LanguageComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  };

  return (
    <button onClick={() => changeLanguage(i18n.language === "eng" ? "est" : "eng")}>
      {t("menu.languageLabel")}
    </button>
  );
};

export default LanguageComponent;
