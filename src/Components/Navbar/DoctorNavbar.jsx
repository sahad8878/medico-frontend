import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import log from '../../Assets/main-logo.png';
import { useSelector,useDispatch } from "react-redux";
import { setLogout } from "../../Store/Slice/DoctorSlice";


function DoctorNavbar() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const {doctor} = useSelector((state) => state.doctorLogin)


  const [navbar, setNavbar] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    dispatch(setLogout())
    Navigate('/')
  };
  return (
    <>
    <nav

className="w-full z-[200] bg-[#97CADB] fixed top-7"
>
<div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-5">
  <div>
    <div className="flex items-center px-6 justify-between py-3 md:py-5 md:block">
      <span>
        {/* <h2 className="text-2xl font-bold">LOGO</h2> */}
        <img className="w-[80px] h-[60px]" src={log} alt="logo" />
      </span>
      <div className="md:hidden">
        <button
          className="p-2 text-[#194569] rounded-md outline-none focus:border-gray-400 focus:border"
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  </div>
  <div>
    <div
      className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
        navbar ? "block" : "hidden"
      }`}
    >
      <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
        <li className="hover:text-[#194569]">
        <Link to="/doctor">
          <span className="text-white font-semibold text-lg px-5 hover:text-[#194569] rounded">
            Home
          </span>
            </Link>
        </li>
     {
      navbar &&
      <div className='space-y-8 md:hidden'>

      
<li className="">
          <Link to='/doctor/DoctorProfilePage'>
        <span className="text-white font-semibold text-lg px-5 cursor-pointer hover:text-[#194569] rounded">
      Details
    </span>
    </Link>
        </li>
        <li className="">
          <Link to='/doctor/DoctorSchedulePage'>
        <span className="text-white font-semibold text-lg px-5 cursor-pointer hover:text-[#194569] rounded">
      schedule
    </span>
    </Link>
        </li>
        <li className="">
          <Link to='/doctor/DoctorAppointmentsPage'>
        <span className="text-white font-semibold text-lg px-5 cursor-pointer hover:text-[#194569] rounded">
      Appointments
    </span>
    </Link>
        </li>
</div>
     }
        
        {doctor&&(
        
        <li className="">
          
        <button
          onClick={handleLogout}
          className="text-white font-semibold text-lg px-5 cursor-pointer hover:text-[#194569] rounded"
        >
          Logout
        </button>
        </li>
        
        )}
       
      </ul>
    </div>
  </div>
</div>
</nav>

      {/*
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="font-semibold text-xl tracking-tight">My App</span>
    </div>
    <div className="w-full flex flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white
         mr-4">
          Home
        </a>
        <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white
         mr-4">
          Service
        </a>
        <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Login
        </a>
      </div>
    </div>
  </nav>
   */}
   
    </>
  );
}

export default DoctorNavbar;
