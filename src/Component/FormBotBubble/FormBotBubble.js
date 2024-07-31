import React, { useEffect, useState } from "react";
import styles from "./formbotBubble.module.css";
import { HiMiniUserCircle } from "react-icons/hi2";

const FormBotBubble = ({ field, index, setIndex }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delay = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIndex(index + 1);
      }, 2000);
    };
    delay();
    //eslint-disable-next-line
  }, []);
  return (
    <div className={styles.container} style={{ alignItems: "end" }}>
      <div
        className={styles.profile}
        style={{ visibility: !field.showProfile && "hidden" }}
      >
        <HiMiniUserCircle className={styles.profileIcon} />
      </div>
      <div className={styles.bubbleContainer}>
        {isLoading ? (
          <div className={styles.dotFlashing}></div>
        ) : (
          <>
            {field.fieldType === 1 && (
              <div className={styles.text}>{field?.fieldValue}</div>
            )}
            {(field.fieldType === 2 || field.fieldType === 4) && (
              <img
                src={field.fieldValue}
                alt="bubbleImg"
                className={styles.media}
              />
            )}{" "}
            {field.fieldType === 3 && (
              <video className={styles.media} controls>
                <source src={field.fieldValue} type="video/mp4" />
              </video>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormBotBubble;
