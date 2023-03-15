import React,{useRef } from 'react'
import TopNav from '../../Components/TopNav/TopNav'
import Navbar from '../../Components/Navbar/Navbar'
import SelectDepartments from '../../Components/ClientService/SelectDepartments'
import ExperiencedDoctors from '../../Components/ClientService/ExperiencedDoctor'
import Footer from '../../Components/Footer/Footer'
import Appointment from '../../Components/ClientService/Appointment'
function ServicePage() {
  function scrollToFirstComponent() {
    const firstComponent = document.getElementById("myFirstComponent");
    if (firstComponent) {
      firstComponent.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <div>
        <TopNav/>
        <Navbar/>
        <div className=' mt-[112px]  md:mt-[127px]'>
         <SelectDepartments  />
         <ExperiencedDoctors/>
         <Appointment scrollToFirstComponent={scrollToFirstComponent}/>
         <Footer/>
        </div>
      

    </div>
  )
}

export default ServicePage
