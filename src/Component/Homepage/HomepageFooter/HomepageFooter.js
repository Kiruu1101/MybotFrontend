import React from "react";
import styles from "./homepageFooter.module.css";
import { FaExternalLinkAlt } from "react-icons/fa";
const HomepageFooter = () => {
  return (
    <div className={`${styles.container} flexbox-center`}>
      <div className={styles.linkList}>
        <div className={`${styles.text} open-sans`}>Made with ❤️ by</div>
        <div className={`${styles.link} open-sans`}>@KiranChavan</div>
      </div>
      <div className={styles.linkList}>
        <div className={`${styles.link} open-sans`}>
          Status <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>
          Documentation <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>
          Roadmap <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>
          Pricing <FaExternalLinkAlt />
        </div>
      </div>
      <div className={styles.linkList}>
        <div className={`${styles.link} open-sans`}>
          Discord <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>
          GitHub repository <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>
          Twitter <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>
          LinkedIn <FaExternalLinkAlt />
        </div>
        <div className={`${styles.link} open-sans`}>OSS Friends</div>
      </div>
      <div className={styles.linkList}>
        <div className={`${styles.link} open-sans`}>About</div>
        <div className={`${styles.link} open-sans`}>Contact</div>
        <div className={`${styles.link} open-sans`}>Terms of Service</div>
        <div className={`${styles.link} open-sans`}>Privacy Policy</div>
      </div>
    </div>
  );
};

export default HomepageFooter;
