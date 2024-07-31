import React, { useState } from "react";
import styles from "./authComponent.module.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import triangle from "../../Assest/images/triangle.png";
import ellipse1 from "../../Assest/images/ellipse1.png";
import ellipse2 from "../../Assest/images/ellipse2.png";

const AuthComponent = ({ isLogin }) => {
  const [login] = useState(isLogin);

  return (
    <div className={`${styles.container} flexbox-center`}>
      <img className={styles.triangle} src={triangle} alt="triangle" />
      <img className={styles.ellipse1} src={ellipse1} alt="ellipse" />
      <img className={styles.ellipse2} src={ellipse2} alt="ellipse" />
      {login ? <Login /> : <Register />}
    </div>
  );
};

export default AuthComponent;
