import React from 'react'
import TopNav from '../../Components/TopNav/TopNav'
import NavBar from '../../Components/Navbar/Navbar'
import ClientAppHistory from '../../Components/ClientProfile/ClientAppHistory'
import Footer from '../../Components/Footer/Footer'
import ClientNotificaiton from '../../Components/ClientNotification/ClientNotificaiton'
function ClientNotificationPage() {
  return (
   
    <div>
    <TopNav/>
    <NavBar/>
    <div className=' mt-[112px]  md:mt-[127px]'>
      <ClientNotificaiton/>
     <Footer/>
    </div>
  

</div>
  )
}

export default ClientNotificationPage
