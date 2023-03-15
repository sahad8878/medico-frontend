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
import DoctorSidebar from "../../Components/DoctorSidebar/DoctorSidebar";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Store/Slice/DoctorSlice";


function DoctorDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState(false);
  const [doctor,setDoctor] = useState([])

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctorToken"));
    const doctorToken = doctor.doctorToken;
    axios
      .get(`/doctor/statusChecking`, {
        headers: { doctortoken: doctorToken },
      })
      .then((response) => {
        const result = response.data;
      setDoctor(result.doctor)

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
    <div className="bg-[#EDF4FE] mt-[100px]  md:mt-[127px]  w-screen  ">
      <div className="container flex mx-auto sm:pt-16 my-11">
        <div className=" pl-10 md:pl-32 hidden md:block  ">
          <DoctorSidebar doctor={doctor} />
        </div>
        <div className="w-full flex justify-center shadow-lg  py-8 md:py-0 px-10  mr-14">
        <DoctorProfile/>
        </div>
      </div>
    </div>
    <Footer />
  </div>


  );
}

export default DoctorDetailsPage;
