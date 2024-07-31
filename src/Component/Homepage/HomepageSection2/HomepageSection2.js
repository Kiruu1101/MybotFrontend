import React, { useEffect, useRef, useState } from "react";
import styles from "./homepageSection2.module.css";
import wrong from "../../../Assest/images/wrong.png";
import correct from "../../../Assest/images/correct.png";
import arrow from "../../../Assest/images/arrow.png";
import DummyFormbot from "../../DummyFormbot/DummyFormbot";
import { DummyForm } from "../../../Utils/DummyForm";

const HomepageSection2 = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={styles.container}>
      <div className={`${styles.heading} outfit-700`}>
        Replace your old school forms with chatbots
      </div>
      <div className={`${styles.text} open-sans`}>
        Typebot is a better way to ask for information. It leads to an increase
        in customer satisfaction and retention and multiply by 3 your conversion
        rate compared to classical forms.
      </div>
      <div className={styles.formbot}>
        <div className={`${styles.arrowText} indie-flower`}>Try it out!</div>
        <img className={styles.arrow} src={arrow} alt="arrow" />
        <div className={styles.oldForm}>
          <img src={wrong} alt="wrong" />
          <div className={styles.form} style={{ padding: "25px" }}>
            <div className={styles.formInput}>
              <div className={styles.label}>
                Full Name <span className={styles.red}>*</span>
              </div>
              <input
                className={styles.input}
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className={styles.formInput}>
              <div className={styles.label}>
                Email <span className={styles.red}>*</span>
              </div>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className={styles.formInput}>
              <div className={styles.label}>
                What services are you interested in?{" "}
                <span className={styles.red}>*</span>
              </div>
              <div className={styles.checkbox}>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="interest1"
                  value="Website Dev"
                />
                <label htmlFor="interest1"> Website Dev</label>
              </div>
              <div className={styles.checkbox}>
                {" "}
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="interest2"
                  value="Content Marketing"
                />
                <label htmlFor="interest2"> Content Marketing</label>
              </div>
              <div className={styles.checkbox}>
                {" "}
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="interest3"
                  value="Social Media"
                />
                <label htmlFor="interest3"> Social Media</label>
              </div>
              <div className={styles.checkbox}>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="interest4"
                  value="UX/UI Design"
                />
                <label htmlFor="interest4"> UX/UI Design</label>
              </div>
            </div>
            <div className={styles.formInput}>
              <div className={styles.label}>
                Additional Information <span className={styles.red}>*</span>
              </div>
              <textarea
                className={styles.input}
                placeholder="Additional Information"
                rows={4}
              />
            </div>
            <button
              className={`${styles.submit} open-sans-semibold primary-btn border-none`}
            >
              Submit
            </button>
          </div>
        </div>
        <div className={styles.newForm}>
          <img src={correct} alt="correct" />
          <div className={styles.form} ref={ref}>
            <DummyFormbot
              index={index}
              setIndex={setIndex}
              DummyForm={DummyForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageSection2;
