import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLogout } from "../Store/Slice/DoctorSlice";

const DoctorPrivateRoutes = () => {
  const navigage = useNavigate();
  const dispatch = useDispatch();
  const doctorToken = JSON.parse(localStorage.getItem("doctorToken"));
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    if (doctorToken) {
      const decodedJwt = parseJwt(doctorToken.doctorToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        message.error("token expired");
        dispatch(setLogout());
        navigage("/admin");
      }
    }
  }, [doctorToken, dispatch, navigage]);

  return doctorToken ? <Outlet /> : <Navigate to="/doctor/doctorLogin" />;
};

export default DoctorPrivateRoutes;
