import React,{useEffect,useState} from 'react';
import DoctorNavbar from '../../Components/Navbar/DoctorNavbar';
import TopNav from '../../Components/TopNav/TopNav';
import axios from '../../Axios/Axios'
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import DoctorAppointments from '../../Components/DoctorAppointments/DoctorAppointments';
import { message } from 'antd';
import DoctorSidebar from '../../Components/DoctorSidebar/DoctorSidebar';
import { useDispatch } from "react-redux";
import { setLogout } from "../../Store/Slice/DoctorSlice";
import DoctorAppointmentHistory from '../../Components/DoctorAppointments/DoctorAppointmentHistory';




function AppointmentHistoryPage() {

    const dispatch = useDispatch()


    const navigate = useNavigate()
    const [ refresh , setRefresh ] = useState(false)
    const [doctor,setDoctor] = useState([])
    useEffect(()=>{
      const doctor = JSON.parse(localStorage.getItem('doctorToken'));
      const doctorToken = doctor.doctorToken
      axios.get(`/doctor/statusChecking`,{headers:{'doctortoken':doctorToken}}).then((response) => {
      const result = response.data
      setDoctor(result.doctor)
      console.log(result.doctorStatus,"aaa");
      if(result.doctorStatus === "blocked"){
        message.error("Youn have been blocked")
        localStorage.removeItem("doctorToken");
        dispatch(setLogout())
        navigate('/')
        setRefresh(!refresh)
      }
      if(result.doctorStatus === "approved"){
       navigate('/doctor/doctorDetailsForm')
       setRefresh(!refresh)
      }
      if(result.doctorStatus === "pending"){
        navigate('/doctor/doctorPendingPage')
       setRefresh(!refresh)
       } 
      })
     
    },[refresh])
  return (
  
    <div>
    <TopNav />
    <DoctorNavbar />
    <div className="bg-[#EDF4FE] mt-[112px]  md:mt-[127px]  w-screen  ">
      <div className="container flex mx-auto pt-16 my-11">
        <div className=" md:pl-10 lg:pl-32  md:block hidden ">
          <DoctorSidebar doctor={doctor} />
        </div>
        <div className="w-full  py-8 md:py-0  sm:pr-0">
        <div className="  bg-[#EDF4FE] bg-opacity-50 shadow-2xl   h-full p-5 ">
               <DoctorAppointmentHistory/>
               </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default AppointmentHistoryPage
