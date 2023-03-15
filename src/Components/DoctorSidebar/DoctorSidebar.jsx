import React from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "../../Assets/user.png";

function DoctorSidebar({ doctor }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="bg-[#EDF4FE] bg-opacity-50 shadow-2xl  sm:mx-4   ">
      <div className="flex justify-center flex-col text-center  ">
        <div className="p-7 mt-2 rounded-lg mx-2 h-72 w-56 lg:w-64 shadow-xl">
          {doctor.doctorImg ? (
            <img
              class="w-52 h-52 mb-3 rounded-full shadow-lg"
              src={doctor.doctorImg}
              alt="doctor prifile image"
            />
          ) : (
            <img
              class="w-52 h-52 mb-3 rounded-full shadow-lg"
              src={profile}
              alt="doctor prifile image"
            />
          )}
          <h1>
            {doctor.fName} {doctor.lName}
          </h1>
        </div>
        <div className="">
          <Link to="/doctor">
            <div
              className={` ${
                path === "/doctor"
                  ? "bg-white text-black"
                  : "text-white  bg-[#194569]"
              }  p-2 mt-2 font-semibold uppercase rounded-lg mx-2  hover:bg-white  hover:text-black`}
            >
              Dashboard
            </div>
          </Link>
          <Link to="/doctor/DoctorProfilePage">
            <div
              className={` ${
                path === "/doctor/DoctorProfilePage"
                  ? "bg-white text-black"
                  : "text-white  bg-[#194569]"
              }  p-2 font-semibold uppercase rounded-lg m-2  hover:bg-white  hover:text-black`}
            >
              Details
            </div>
          </Link>
          <Link to="/doctor/DoctorSchedulePage">
            <div
              className={` ${
                path === "/doctor/DoctorSchedulePage"
                  ? "bg-white text-black"
                  : "text-white  bg-[#194569]"
              }  p-2 font-semibold uppercase rounded-lg mx-2  hover:bg-white  hover:text-black`}
            >
              schedule
            </div>
          </Link>
          <Link to="/doctor/DoctorAppointmentsPage">
            <div
              className={` ${
                path === "/doctor/DoctorAppointmentsPage"
                  ? "bg-white text-black"
                  : "text-white  bg-[#194569]"
              }  p-2 font-semibold uppercase rounded-lg m-2  hover:bg-white  hover:text-black`}
            >
              Appointments
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorSidebar;
