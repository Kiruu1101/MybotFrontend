import React, { useContext } from "react";
import styles from "./homepageHeader.module.css";
import logo from "../../../Assest/images/logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../../context/authContext/AuthContext";

const HomepageHeader = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div
        className={`${styles.logo} cursor-pointer`}
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" />
        <span className={`${styles.logoName} outfit-700`}>FormBot</span>
      </div>
      <div className={styles.headerBtn}>
        {!user && (
          <button
            className={`${styles.sign} open-sans-bold border-btn`}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
        <button
          className={`${styles.sign} open-sans-bold primary-btn border-none`}
          onClick={() => navigate("/workspace")}
        >
          Create a FormBot
        </button>
      </div>
    </div>
  );
};

export default HomepageHeader;
