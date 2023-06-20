import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLogout } from "../Store/Slice/AdminSlice";

const AdminPrivateRoutes = () => {
  const navigage = useNavigate();
  const dispatch = useDispatch();
  const adminToken = JSON.parse(localStorage.getItem("adminToken"));

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    if (adminToken) {
      const decodedJwt = parseJwt(adminToken.adminToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        message.error("token expired");
        dispatch(setLogout());
        navigage("/admin");
      }
    }
  }, [adminToken,dispatch,navigage]);

  return adminToken ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminPrivateRoutes;
