import React from "react";
import styles from "./formTheme.module.css";
import themeLight from "../../../Assest/images/themelight.png";
import themeDark from "../../../Assest/images/themedark.png";
import themeBlue from "../../../Assest/images/themeblue.png";
import FormBot from "../../FormBot/FormBot";
import { useParams } from "react-router-dom";

const FormTheme = ({ theme, setTheme }) => {
  const params = useParams();
  const { formId } = params;
  return (
    <div className={styles.container}>
      <div className={styles.themeMenu}>
        <div className={`${styles.title} open-sans-bold`}>
          Customize the theme
        </div>
        <div className={styles.line}></div>
        <div className={styles.themes}>
          <div
            className={`${styles.theme} ${theme === 1 && styles.active}`}
            onClick={() => setTheme(1)}
          >
            <img className={styles.themeImg} src={themeLight} alt="theme" />
            <div className={`${styles.themeText} open-sans-semibold`}>
              Light
            </div>
          </div>
          <div
            className={`${styles.theme} ${theme === 2 && styles.active}`}
            onClick={() => setTheme(2)}
          >
            <img className={styles.themeImg} src={themeDark} alt="theme" />
            <div className={`${styles.themeText} open-sans-semibold`}>Dark</div>
          </div>
          <div
            className={`${styles.theme} ${theme === 3 && styles.active}`}
            onClick={() => setTheme(3)}
          >
            <img className={styles.themeImg} src={themeBlue} alt="theme" />
            <div className={`${styles.themeText} open-sans-semibold`}>
              Tail Blue
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.themeBoard} ${
          theme === 1
            ? styles.light
            : theme === 2
            ? styles.dark
            : styles.tailBlue
        }`}
      >
        {formId && <FormBot themes={theme} trial={true} />}
      </div>
    </div>
  );
};

export default FormTheme;
