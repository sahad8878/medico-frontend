import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import axios from '../../Axios/Axios'
import DoctorDashboard from '../../Components/DoctorHome/DoctorDashboard'
import DoctorTimeSchedule from '../../Components/DoctorHome/DoctorTimeSchedul'
import DoctorSidebar from '../../Components/DoctorSidebar/DoctorSidebar'
import Footer from '../../Components/Footer/Footer'
import DoctorNavbar from '../../Components/Navbar/DoctorNavbar'
import TopNav from '../../Components/TopNav/TopNav'
import { useDispatch } from "react-redux";
import { setLogout } from "../../Store/Slice/DoctorSlice";

function DoctorSchedulePage() {

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
    <div className="bg-[#EDF4FE] mt-[100px]  md:mt-[127px]  w-screen  ">
      <div className="container flex mx-auto sm:pt-16 my-11">
        <div className=" pl-10 md:pl-32 hidden md:block  ">
          <DoctorSidebar doctor={doctor} />
        </div>
        <div className="w-full  shadow-lg  py-8 md:py-0 px-10  mr-14">
        <DoctorTimeSchedule/>
        </div>
      </div>
    </div>
    <Footer />
  </div>

  )
}

export default DoctorSchedulePage