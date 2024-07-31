import axios from "axios";
import { toast } from "react-toastify";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./AuthAction";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const loginApi = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${backendUrl}auth/login`, user);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
    }
    dispatch(loginSuccess(res.data));
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    dispatch(loginFailure());
    return false;
  }
};

export const updateUser = async (data, dispatch) => {
  dispatch(updateStart());
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.put(`${backendUrl}auth/update-user`, data);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
    }
    if (res?.data?.logout) {
      dispatch(logout());
      return res?.data;
    }
    dispatch(updateSuccess(res?.data));
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    if (error?.response?.data?.isUnauthorized) {
      localStorage.clear();
      dispatch(logout());
      return;
    }
    dispatch(updateFailure());
  }
};

export const registerApi = async (formData) => {
  try {
    const res = await axios.post(`${backendUrl}auth/register`, formData);
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};
