import React, { useState } from "react";
import styles from "./register.module.css";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../context/authContext/apiCalls";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const usernameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (processing) return;
    setProcessing(true);
    // client-side validation
    let flag = true;
    if (
      formData.username.trim().length === 0 ||
      !usernameRegex.test(formData.username.trim())
    ) {
      setFormError((prev) => ({ ...prev, nameErr: "Invalid username" }));
      flag = false;
    } else {
      setFormError((prev) => ({ ...prev, nameErr: "" }));
    }
    if (!emailRegex.test(formData.email.trim())) {
      setFormError((prev) => ({ ...prev, emailErr: "Invalid email" }));
      flag = false;
    } else {
      setFormError((prev) => ({ ...prev, emailErr: "" }));
    }
    if (!passwordRegex.test(formData.password.trim())) {
      setFormError((prev) => ({ ...prev, passwordErr: "Weak password" }));
      flag = false;
    } else {
      setFormError((prev) => ({ ...prev, passwordErr: "" }));
    }
    if (confirmPassword.trim() !== formData.password.trim()) {
      setFormError((prev) => ({
        ...prev,
        confirmPasswordErr: "Password doesn’t match",
      }));
      flag = false;
    } else {
      setFormError((prev) => ({ ...prev, confirmPasswordErr: "" }));
    }
    if (flag) {
      const res = await registerApi(formData);
      setProcessing(false);
      if (res) {
        navigate("/login");
      }
    } else {
      setProcessing(false);
    }
  };
  return (
    <div className={`${styles.container} flexbox-center`}>
      <div className={`${styles.inputContinaer} open-sans-400`}>
        <div
          className={`${styles.label} ${
            formError.nameErr && styles.errorLabel
          }`}
        >
          Username
        </div>
        <input
          type="text"
          id="name"
          name="username"
          className={`${styles.input} ${
            formError.nameErr && styles.errorInput
          }`}
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter a username"
        />
        {formError.nameErr && (
          <div className={styles.error}>{formError.nameErr}</div>
        )}
      </div>
      <div className={`${styles.inputContinaer} open-sans-400`}>
        <div
          className={`${styles.label} ${
            formError.emailErr && styles.errorLabel
          }`}
        >
          Email
        </div>
        <input
          type="email"
          id="email"
          name="email"
          className={`${styles.input} ${
            formError.emailErr && styles.errorInput
          }`}
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {formError.emailErr && (
          <div className={styles.error}>{formError.emailErr}</div>
        )}
      </div>
      <div className={styles.inputContinaer}>
        <div
          className={`${styles.label} ${
            formError.passwordErr && styles.errorLabel
          }`}
        >
          Password
        </div>
        <input
          type="password"
          name="password"
          className={`${styles.input} ${
            formError.passwordErr && styles.errorInput
          }`}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {formError.passwordErr && (
          <div className={styles.error}>{formError.passwordErr}</div>
        )}
      </div>
      <div className={styles.inputContinaer}>
        <div
          className={`${styles.label} ${
            formError.confirmPasswordErr && styles.errorLabel
          }`}
        >
          Confirm Password
        </div>
        <input
          type="password"
          name="cpassword"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Enter your Confirm password"
        />
        {formError.confirmPasswordErr && (
          <div className={styles.error}>{formError.confirmPasswordErr}</div>
        )}
      </div>
      <div className={styles.footer}>
        <button
          className={`${styles.btn} ${styles.main} open-sans cursor-pointer text-center border-none flexbox-center white`}
          onClick={handleSubmit}
        >
          {processing ? <Spinner /> : "Sign up"}
        </button>
        <div className={`${styles.footerText} inter text-center`}>
          Already have an account ?{" "}
          <span
            className={`${styles.login} cursor-pointer`}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
