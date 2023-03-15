import React from 'react'
import DepartmentDoctors from '../../Components/DepartmentDoctors/DepartmentDoctors'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import TopNav from '../../Components/TopNav/TopNav'
function DepartmentDoctorsPage() {
  return (

<div>
<TopNav/>
<Navbar/>
<div className=' mt-[112px]  md:mt-[127px]'>
<DepartmentDoctors
/>
 <Footer/>
</div>


</div>
  )
}

export default DepartmentDoctorsPage
