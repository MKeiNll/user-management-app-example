import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { default as translations } from "./translations.json";

console.log(translations);

i18n.use(initReactI18next).init({
  resources: translations,
  lng: "eng",
  interpolation: {
    escapeValue: false
  },
  ns: ["translations"],
  defaultNS: "translations"
});

export default i18n;
