export const loginStart = () => ({
  type: "Login_Start",
});

export const loginSuccess = (user) => ({
  type: "Login_Success",
  payload: user,
});

export const loginFailure = () => ({
  type: "Login_Failure",
});

// updateUser
export const updateStart = () => ({
  type: "UPDATE_START",
});
export const updateFailure = () => ({
  type: "UPDATE_FAILURE",
});
export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

//logout
export const logout = () => ({
  type: "LOGOUT",
});
