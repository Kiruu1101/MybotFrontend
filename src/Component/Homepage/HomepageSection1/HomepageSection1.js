import React from "react";
import styles from "./homepageSection1.module.css";
import attachment1 from "../../../Assest/images/attachment1.png";
import attachment2 from "../../../Assest/images/attachment2.png";
import form from "../../../Assest/images/form.png";
import { useNavigate } from "react-router-dom";

const HomepageSection1 = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src={attachment2} alt="attachment" width={300} height={300} />
        <div className={styles.content}>
          <div className={`${styles.heading} outfit-700`}>
            Build advanced chatbots visually
          </div>
          <div className={`${styles.text} open-sans`}>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </div>
          <button
            className={`${styles.create} open-sans-semibold primary-btn border-none`}
            onClick={() => navigate("/workspace")}
          >
            Create a FormBot for free
          </button>
        </div>
        <img src={attachment1} alt="attachment" width={300} height={300} />
      </div>
      <div className={styles.formImg}>
        <div className={`${styles.circle} ${styles.circle1}`}></div>
        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <img src={form} alt="formbot" />
      </div>
    </div>
  );
};

export default HomepageSection1;
