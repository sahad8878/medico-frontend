import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios/Axios";
import { useDispatch } from "react-redux";
import { message } from "antd";
import DoctorNavbar from "../../Components/Navbar/DoctorNavbar";
import Footer from "../../Components/Footer/Footer";
import TopNav from "../../Components/TopNav/TopNav";
import { setLogout } from "../../Store/Slice/DoctorSlice";

function DoctorPendingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctorToken"));
    const doctorToken = doctor.doctorToken;
    axios
      .get(`/doctor/statusChecking`, { headers: { doctortoken: doctorToken } })
      .then((response) => {
        const result = response.data;
        console.log(result.doctorStatus, "aaa");
        if (result.doctorStatus === "rejected") {
          message.error(
            "Your request has  been rejected for some reason. Please try again"
          );
          localStorage.removeItem("doctorToken");
          dispatch(setLogout());
          navigate("/doctor/deniedUi");
        }
        if (result.doctorStatus === "blocked") {
          message.error("Youn have been blocked");
          localStorage.removeItem("doctorToken");
          dispatch(setLogout());
          navigate("/");
          setRefresh(!refresh);
        }
        if (result.doctorStatus === "approved") {
          setRefresh(!refresh);
          navigate("/doctor/doctorDetailsForm");
        }
        if (result.doctorStatus === "active") {
          setRefresh(!refresh);
          navigate("/doctor");
        }
      });
  }, [refresh]);
  return (
    <>
      <TopNav />
      <DoctorNavbar />
      <div className="flex flex-col md:flex-row mt-[110px]  md:mt-[129px]">
        <div className="  w-full   bg-[#EDF4FE]  flex justify-center content-center">
          <div className="p-20 px-46 lg:p-44">
            <h1 className=" text-4xl font-serif font-bold ">
              Your request has not been approved yet. After verification you
              will get notification
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DoctorPendingPage;
