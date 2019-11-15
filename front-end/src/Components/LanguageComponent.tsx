import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  menuItem: {
    "alignItems": "center",
    "display": "flex",
    "float": "right",
    "height": "100%",
    "&:hover": {
      background: "#C9CEEA",
      color: "#3F51B5",
      cursor: "pointer",
    },
    "justifyContent": "center",
    "width": "180px",
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
