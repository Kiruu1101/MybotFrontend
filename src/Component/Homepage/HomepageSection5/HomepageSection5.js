import React, { useEffect, useRef, useState } from "react";
import styles from "./homepageSection5.module.css";
import DummyFormbot from "../../DummyFormbot/DummyFormbot";
import { DummyForm2 } from "../../../Utils/DummyForm2";

const HomepageSection5 = () => {
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
    <div className={`${styles.container} flexbox-center`}>
      <div className={`${styles.content} `}>
        <div className={`${styles.heading}  outfit-700`}>
          Integrate with any platform
        </div>
        <div className={`${styles.text} open-sans`}>
          One of the main advantage of a chat application is that you collect
          the user's responses on each question.
        </div>
        <div className={`${styles.text} open-sans-bold`}>
          You won't lose any valuable data.
        </div>
      </div>
      <div className={`${styles.formbot}`} ref={ref}>
        <DummyFormbot
          index={index}
          setIndex={setIndex}
          DummyForm={DummyForm2}
        />
      </div>
    </div>
  );
};

export default HomepageSection5;
