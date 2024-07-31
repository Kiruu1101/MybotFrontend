import React from "react";
import styles from "./homepageSection7.module.css";
import attachment1 from "../../../Assest/images/attachment1.png";
import attachment2 from "../../../Assest/images/attachment2.png";
import { useNavigate } from "react-router-dom";

const HomepageSection7 = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img
          className={styles.attachment2}
          src={attachment2}
          alt="attachment"
          width={300}
          height={300}
        />
        <div className={styles.content}>
          <div className={`${styles.heading} outfit-700`}>
            Improve conversion and user engagement with FormBots
          </div>

          <button
            className={`${styles.create} open-sans-semibold primary-btn border-none`}
            onClick={() => navigate("/workspace")}
          >
            Create a FormBot
          </button>
          <div className={`${styles.text} open-sans`}>
            No trial. Generous <span className="open-sans-bold">free</span>{" "}
            plan.
          </div>
        </div>
        <img src={attachment1} alt="attachment" width={300} height={300} />
      </div>
    </div>
  );
};

export default HomepageSection7;
