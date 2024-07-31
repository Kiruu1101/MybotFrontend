import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component, isAuthenticate }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {isAuthenticate ? (
        user ? (
          <Navigate to="/workspace" />
        ) : (
          <Component />
        )
      ) : user ? (
        <Component />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ProtectedRoute;
