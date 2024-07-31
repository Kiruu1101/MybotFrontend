import { toast } from "react-toastify";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "Login_Start":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "Login_Success":
      const { message, ...userData } = action.payload;
      return {
        user: userData,
        isFetching: false,
        error: false,
      };
    case "Login_Failure":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      toast.success("Logout Successfully");
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: { ...state.user, name: action?.payload?.name },
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
