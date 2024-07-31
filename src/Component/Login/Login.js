import React, { useContext, useState } from "react";
import styles from "./login.module.css";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [processing, setProcessing] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (processing) return;
    setProcessing(true);
    try {
      await loginApi(formData, dispatch);
      navigate("/workspace/");
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
    }
  };

  return (
    <div className={`${styles.container} flexbox-center`}>
      <div className={`${styles.inputContinaer} open-sans-400`}>
        <div className={styles.label}>Email</div>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.inputContinaer}>
        <div className={styles.label}>Password</div>
        <input
          type="password"
          name="password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <div className={styles.footer}>
        <button
          className={`${styles.btn} ${styles.main} open-sans cursor-pointer text-center border-none flexbox-center white`}
          onClick={handleSubmit}
        >
          {processing ? <Spinner /> : "Log in"}
        </button>
        <div className={`${styles.footerText} inter text-center`}>
          Don’t have an account?{" "}
          <span
            className={`${styles.register} cursor-pointer`}
            onClick={() => navigate("/register")}
          >
            Register now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
