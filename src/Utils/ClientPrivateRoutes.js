import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setLogout } from "../Store/Slice/ClientSlice";

const ClientPrivateRoutes = () => {
    const navigage = useNavigate();
    const dispatch = useDispatch();
const clientToken = JSON.parse(localStorage.getItem('clientToken'))
const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    if (clientToken) {
      const decodedJwt = parseJwt(clientToken.clientToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        message.error("token expired");
        dispatch(setLogout());
        navigage("/login");
      }
    }
  }, [clientToken,dispatch,navigage]);

return (

    clientToken ? <Outlet/> : <Navigate to="/login"/>
)
   

}

export default ClientPrivateRoutes