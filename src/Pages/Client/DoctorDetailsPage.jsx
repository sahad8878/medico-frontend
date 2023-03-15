import React from 'react'
import DoctorDetails from '../../Components/DepartmentDoctors/DoctorDetails'

import TopNav from '../../Components/TopNav/TopNav'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
function DoctorDetailspage() {
  return (

    <div>
    <TopNav/>
    <Navbar/>
    <div className=' mt-[112px]  md:mt-[127px]'>
    <DoctorDetails/>
     <Footer/>
    </div>
    
    
    </div>
  )
}

export default DoctorDetailspage
