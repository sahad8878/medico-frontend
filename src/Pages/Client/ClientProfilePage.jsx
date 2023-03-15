import React from 'react'
import TopNav from '../../Components/TopNav/TopNav'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import ClientProfile from '../../Components/ClientProfile/ClientProfile'
function ClientProfilePage() {

  
  return (
    <div>
        <TopNav/>
        <Navbar/>
        <div className=' mt-[112px]  md:mt-[127px]'>
    <ClientProfile/>
         <Footer/>
        </div>
      

    </div>
  )
}

export default ClientProfilePage
