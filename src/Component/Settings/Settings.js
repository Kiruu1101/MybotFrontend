import React, { useContext, useState } from "react";
import styles from "./settings.module.css";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import profile from "../../Assest/images/Profile.png";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import { updateUser } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { HiOutlineLogout } from "react-icons/hi";
import { CgBot } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../context/authContext/AuthAction";

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassowrd] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [changedField, setChangedField] = useState("");
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassowrd(!showConfirmPassword);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (name.trim().length === 0) {
      return "Name is required";
    }
    if (!nameRegex.test(name.trim())) {
      return "Invalid Name";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim().length === 0) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Email is not valid";
    }
    return "";
  };

  const validateOldPassword = (password) => {
    if (password.trim().length === 0) {
      return "Old Password is required";
    }
    return "";
  };

  const validateNewPassword = (password) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (password.trim().length === 0) {
      return "New Password is required";
    }
    if (!passwordRegex.test(password.trim())) {
      return "Weak Password";
    }
    return "";
  };

  const handleChange = (setter, validator, field) => (event) => {
    const value = event.target.value;
    setter(value);
    setChangedField(field);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validator(value),
    }));
  };

  const handleSubmit = async () => {
    if (processing) return;
    if (changedField) {
      let data = {};
      let isValid = true;
      if (changedField === "name") {
        if (error?.name?.length === 0) {
          data["name"] = name;
        } else {
          isValid = false;
        }
      } else if (changedField === "email") {
        if (error?.email?.length === 0) {
          data["email"] = email;
        } else {
          isValid = false;
        }
      } else if (
        changedField === "oldPassword" ||
        changedField === "newPassword"
      ) {
        if (
          error?.oldPassword?.length === 0 &&
          error?.newPassword?.length === 0
        ) {
          data["oldPassword"] = oldPassword;
          data["password"] = newPassword;
        } else {
          isValid = false;
        }
      }
      if (!isValid) {
        toast.error("Something went wrong");
        return;
      } else {
        setProcessing(true);
        const res = await updateUser(data, dispatch);
        if (res?.logout) {
          navigate("/login");
        }
        setProcessing(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div
          className={styles.homepageIcon}
          onClick={() => navigate("/workspace/")}
        >
          <CgBot />
        </div>
        <div
          className={`${styles.logout} poppins-500 cursor-pointer`}
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          <HiOutlineLogout className={styles.navIcon} />
          <span>Logout</span>
        </div>
      </div>
      <div className={styles.settings}>
        <div className={`${styles.header} open-sans-semibold`}>Settings</div>
        <div className={styles.settingContainer}>
          <div>
            <div className={`${styles.inputContinaer} open-sans`}>
              <img src={profile} alt="profile" className={styles.icon} />
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={name}
                onChange={handleChange(setName, validateName, "name")}
                placeholder="Name"
              />
            </div>
            {error.name && <div className={styles.error}>{error.name}</div>}
          </div>
          <div>
            <div className={`${styles.inputContinaer} open-sans`}>
              <CiMail className={styles.icon} />
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={email}
                onChange={handleChange(setEmail, validateEmail, "email")}
                placeholder="Update Email"
              />
            </div>
            {error.email && <div className={styles.error}>{error.email}</div>}
          </div>
          <div>
            <div className={styles.inputContinaer}>
              <CiLock className={styles.icon} />
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                className={styles.input}
                value={oldPassword}
                onChange={handleChange(
                  setOldPassword,
                  validateOldPassword,
                  "oldPassword"
                )}
                placeholder="Old Password"
              />
              {showPassword ? (
                <IoEyeOffOutline
                  className={styles.icon}
                  style={{ float: "right" }}
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <IoEyeOutline
                  className={styles.icon}
                  style={{ float: "right" }}
                  onClick={handlePasswordVisibility}
                />
              )}
            </div>
            {error.oldPassword && (
              <div className={styles.error}>{error.oldPassword}</div>
            )}
          </div>
          <div>
            <div className={styles.inputContinaer}>
              <CiLock className={styles.icon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="newPassword"
                className={styles.input}
                value={newPassword}
                onChange={handleChange(
                  setNewPassword,
                  validateNewPassword,
                  "newPassword"
                )}
                placeholder="New Password"
              />
              {showConfirmPassword ? (
                <IoEyeOffOutline
                  className={styles.icon}
                  style={{ float: "right" }}
                  onClick={handleConfirmPasswordVisibility}
                />
              ) : (
                <IoEyeOutline
                  className={styles.icon}
                  style={{ float: "right" }}
                  onClick={handleConfirmPasswordVisibility}
                />
              )}
            </div>
            {error.newPassword && (
              <div className={styles.error}>{error.newPassword}</div>
            )}
          </div>
          <div className={styles.remainder}>
            * To update your account, change in the field and click the "Update"
            button. You can update one field at a time either Name or Email or
            Change Password.
          </div>
          <button
            className={`${styles.btn} ${styles.mainbtn} open-sans cursor-pointer text-center border-none flexbox-center white`}
            onClick={() => handleSubmit()}
          >
            {processing ? <Spinner /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
