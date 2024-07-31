import React from "react";
import styles from "./homepageSection3.module.css";

const HomepageSection3 = ({ imgSrc, heading, text, isReverse }) => {
  return (
    <div
      className={styles.container}
      style={{ flexDirection: isReverse ? "row-reverse" : "row" }}
    >
      <img src={imgSrc} alt="formbot" />
      <div className={styles.content}>
        <div className={`${styles.heading} outfit-700`}>{heading}</div>
        <div className={`${styles.text} open-sans`}>{text}</div>
      </div>
    </div>
  );
};

export default HomepageSection3;
