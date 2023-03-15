import React from 'react'
import { Link} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import DoctorNavbar from '../../Components/Navbar/DoctorNavbar'
import TopNav from '../../Components/TopNav/TopNav'

function DeniedUi() {

  return (
    <>
    <TopNav/>
    <DoctorNavbar/>
    <div className="flex flex-col md:flex-row mt-[110px]  md:mt-[129px]">
      <div className="  w-full   bg-[#EDF4FE]  flex justify-center content-center">
        <div className="p-20 px-46 lg:p-44">
          <h1 className=" text-4xl font-serif font-bold  ">
            Your request has  been rejected for some reason. Please try again 
          </h1>
           <div className='flex justify-center content-center mt-10'>
            <Link to='/'>
               <button className='bg-[#194569] text-white py-2 font-bold text-2xl hover:bg-opacity-70  px-4'>Home</button>
            </Link>

           </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default DeniedUi
