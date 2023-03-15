import React, { useState } from "react";
import { Link,useLocation,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";

import docIcon from "../../Assets/doctor.ico";
import clientIcon from "../../Assets/group.ico";
import homeIcon from "../../Assets/home.ico";
import inboxIcon from '../../Assets/inbox.png'
import appointmenIcon from "../../Assets/book-appointments.ico";
import departmentIcon from '../../Assets/department.png'
import { setLogout } from "../../Store/Slice/AdminSlice";



function AdminSidebar() {
const navigate = useNavigate()
  const dispatch = useDispatch()
const {admin} = useSelector((state) => state.adminLogin)
  const location = useLocation()
const path = location.pathname
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    dispatch(setLogout())
    navigate("/admin")
  };
  return (

    <aside className="  h-screen fixed hidden sm:block ">
      <div className=" ">
        <div className=" h-screen  p-3 bg-[#194569] shadow w-60 sm:w-72">
          <div className="space-y-3">
            
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center py-4">
                <button
                  type="submit"
                  className="p-2 focus:outline-none focus:ring"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                placeholder="Search..."
                className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Link to="/admin/adminHome" >
                  <span
                    className={`flex items-center p-2 space-x-3 rounded-md uppercase `}
                  >
                    <img className=" h-7" src={homeIcon} alt="logo" />

                    <span className={ `  hover:text-[#D6E8EE] ${path === "/admin/adminHome" ? "text-white font-semibold " : "text-[#97CADB] "} `}>Home</span>
                  </span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link to="/admin/AdminInboxPage" >
                  <span
                    className="flex items-center uppercase p-2 space-x-3 rounded-md"
                  >
                    <img className=" h-7" src={inboxIcon} alt="logo" />

                    <span className={ `  hover:text-[#D6E8EE] ${path === "/admin/AdminInboxPage" ? "text-white font-semibold " : "text-[#97CADB] "} `}>Inbox</span>
                  </span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link to="/admin/adminClientPage">

                 
                  <span
                    className="flex items-center p-2 space-x-3 rounded-md uppercase"
                  >
                    <img className=" h-7" src={clientIcon} alt="logo" />

                    <span className={ `  hover:text-[#D6E8EE] ${path === "/admin/adminClientPage" ? "text-white font-semibold " : "text-[#97CADB] "} `}>Clients</span>
                  </span>
                  </Link>
                </li>
                <li className="rounded-sm">
                <Link to="/admin/adminDoctorsPage" >
                  <span
                    className="flex items-center p-2 space-x-3 rounded-md uppercase"
                  >
                    <img className=" h-7" src={docIcon} alt="logo" />
                    <span className={ `  hover:text-[#D6E8EE] ${path === "/admin/adminDoctorsPage" ? "text-white font-semibold " : "text-[#97CADB] "} `}>Doctors</span>
                  </span>
                  </Link>
                </li>
                <li className="rounded-sm">
                <Link to="/admin/AdminDepartmentPage" >
                  <span
                    className="flex items-center p-2 space-x-3 rounded-md uppercase"
                  >
                    <img className=" h-7" src={departmentIcon} alt="logo" />
                    <span className={ `  hover:text-[#D6E8EE] ${path === "/admin/AdminDepartmentPage" ? "text-white font-semibold " : "text-[#97CADB] "} `}>Departments</span>
                  </span>
                  </Link>
                </li>
                <li className="rounded-sm">
                <Link to="/admin/AdminAppointmentsPage" >
                  <span
                    className="flex items-center p-2 space-x-3 rounded-md uppercase"
                  >
                    <img className=" h-7" src={appointmenIcon} alt="logo" />
                    <span className={ `  hover:text-[#D6E8EE] ${path === "/admin/AdminAppointmentsPage" ? "text-white font-semibold " : "text-[#97CADB] "} `}>Appointments</span>
                  </span>
                  </Link>
                </li>
                {admin && (
                <li className="rounded-sm cursor-pointer">
                  <span onClick={handleLogout}
                    className="flex items-center p-2 space-x-3 rounded-md uppercase"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span  className="text-[#97CADB] hover:text-white">Logout</span>
                  </span>
                </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
