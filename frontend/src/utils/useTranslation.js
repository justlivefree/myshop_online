import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "./translations";

const useTranslation = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang] || translations.uz;
  return { t, lang };
};

export default useTranslation;
