import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createFolder = async (folderData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.post(`${backendUrl}form/create-folder`, folderData);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getAllFolder = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(`${backendUrl}form/get-all-folder`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.delete(
      `${backendUrl}form/delete-folder/${folderId}`
    );
    toast.success(res?.data?.message);
    return res?.data?.deleted;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const deleteForm = async (formId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.delete(`${backendUrl}form/delete-form/${formId}`);
    toast.success(res?.data?.message);
    return res?.data?.deleted;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const createForm = async (folderData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.post(`${backendUrl}form/create-form`, folderData);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const updateForm = async (folderData, formId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.post(
      `${backendUrl}form/update-form/${formId}`,
      folderData
    );
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getAllForm = async (folderId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(`${backendUrl}form/get-all-form/${folderId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getForm = async (formId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(`${backendUrl}form/get-form/${formId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getFormData = async (formId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(`${backendUrl}form/get-form-data/${formId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const addFormData = async (formData) => {
  try {
    const res = await axios.post(`${backendUrl}form/add-form-data`, formData);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getUserForm = async (formId) => {
  try {
    const res = await axios.get(`${backendUrl}form/get-user-form/${formId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};
