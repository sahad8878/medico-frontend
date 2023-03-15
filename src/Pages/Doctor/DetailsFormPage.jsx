import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Footer from '../../Components/Footer/Footer';
import DoctorNavbar from '../../Components/Navbar/DoctorNavbar';
import Navbar from '../../Components/Navbar/Navbar';
import DoctorDetail from '../../Components/Signup/DoctorDetailForm';
import TopNav from '../../Components/TopNav/TopNav';
import axios from '../../Axios/Axios'
import { useDispatch } from "react-redux";
import { setLogout } from "../../Store/Slice/DoctorSlice";
function DetailsFormPage() {
  const [ refresh , setRefresh ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(()=>{
    const doctor = JSON.parse(localStorage.getItem('doctorToken'));
    const doctorToken = doctor.doctorToken
    axios.get(`/doctor/statusChecking`,{headers:{'doctortoken':doctorToken}}).then((response) => {
    const result = response.data
  
    if(result.doctorStatus === "blocked"){
      message.error("Youn have been blocked")
      localStorage.removeItem("doctorToken");
      dispatch(setLogout())
      navigate('/')
    }
    if(result.doctorStatus === "pending"){
     navigate('/doctor/doctorPendingPage')
     setRefresh(!refresh)
    }
    if(result.doctorStatus === "active"){
     navigate('/doctor')
     setRefresh(!refresh)

    }
    })
   
  },[refresh])

  return (
    <>
      <TopNav />
      {/* <Navbar /> */}
      <DoctorNavbar/>
      <DoctorDetail/>
      <Footer />
    </>
  );
}

export default DetailsFormPage;