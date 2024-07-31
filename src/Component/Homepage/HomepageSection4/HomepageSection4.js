import React from "react";
import styles from "./homepageSection4.module.css";
import { Platforms } from "../../../Utils/Platform";

const HomepageSection4 = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.platforms}>
        {Platforms.map((platform, index) => (
          <div
            key={platform.id}
            className={`${styles.platform} flexbox-center`}
            style={{
              order:
                platform.id <= 8
                  ? platform.id
                  : Platforms.length - (platform.id - 9),
            }}
          >
            <img src={platform.imgUrl} alt="platform" />
          </div>
        ))}
      </div>
      <div className={`${styles.content} `}>
        <div className={`${styles.heading} outfit-700`}>
          Integrate with any platform
        </div>
        <div className={`${styles.text} open-sans`}>
          Typebot offers several native integrations blocks as well as
          instructions on how to embed typebot on particular platforms
        </div>
      </div>
    </div>
  );
};

export default HomepageSection4;
