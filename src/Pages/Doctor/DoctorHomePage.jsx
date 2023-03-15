import React, { useEffect, useState } from "react";
import DoctorHome from "../../Components/DoctorHome/DoctorHome";
import DoctorNavbar from "../../Components/Navbar/DoctorNavbar";
import TopNav from "../../Components/TopNav/TopNav";
import axios from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { message } from "antd";
import DoctorProfile from "../../Components/DoctorHome/DoctorProfile";
import DoctorDashboard from "../../Components/DoctorHome/DoctorDashboard";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Store/Slice/DoctorSlice";
function DoctorHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctorToken"));
    const doctorToken = doctor.doctorToken;
    axios
      .get(`/doctor/statusChecking`, {
        headers: { doctortoken: doctorToken },
      })
      .then((response) => {
        const result = response.data;
        if (result.doctorStatus === "blocked") {
          message.error("Youn have been blocked");
          localStorage.removeItem("doctorToken");
          dispatch(setLogout())
          navigate("/");
          setRefresh(!refresh);
        }
        if (result.doctorStatus === "approved") {
          navigate("/doctor/doctorDetailsForm");
          setRefresh(!refresh);
        }
        if (result.doctorStatus === "pending") {
          navigate("/doctor/doctorPendingPage");
          setRefresh(!refresh);
        }
      });
  }, [refresh]);
  return (
    <div>
      <TopNav />
      <DoctorNavbar />
      <div className=" mt-[112px]  md:mt-[127px]">
        <DoctorDashboard />
        <DoctorHome />
        <DoctorProfile />
        <Footer />
      </div>
    </div>
  );
}

export default DoctorHomePage;
