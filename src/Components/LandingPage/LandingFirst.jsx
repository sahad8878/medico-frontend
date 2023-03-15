/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import doctorImage from '../../Assets/doctor-image.jpg';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from "react-redux";


function LandingFirst() {
  const {client} = useSelector((state) => state.clientLogin)


  const notLogin = () => {
    message.error('You must be logged in to continue')
  }
  return (
     <>
 <div className="flex flex-col md:flex-row mt-[110px]  md:mt-[129px]">
      <div className="  w-full   bg-[#D6E8EE] md:w-[40%] flex justify-center content-center">
        <div className='p-20 lg:p-44'>
        <h1 className=' text-4xl font-serif font-bold '>
        LET'S FIND YOUR
          DOCTOR
        </h1>
        {
          client ? (
          <Link to='/service'>
        <span className="cursor-pointer  flex justify-center  mt-10 font-semibold text-xl w-48 bg-[#194569] p-2  text-white hover:text-black">
          Appointment
          <ArrowForwardIcon
            style={{ marginLeft: '10px', marginTop: '5px' }}
          />
        </span>
        </Link> 
          ) : (
            <span onClick={notLogin} className="cursor-pointer  flex justify-center  mt-10 font-semibold text-xl w-48 bg-[#194569] p-2  text-white hover:text-black">
            Appointment
            <ArrowForwardIcon
              style={{ marginLeft: '10px', marginTop: '5px' }}
            />
          </span>
          )
        }

        </div>


      </div>
      <div className="w-full  bg-white  md:w-[60%] p-4">
      <div className=" inset-0 flex items-center justify-center ">
          <div className="bg-white mb-5 lg:p-12  ">
            <img src={doctorImage} alt="" />
          </div>
        </div>
      </div>
    </div>
    
    {/* <div className=" flex  w-screen h-screen">
      <div className=" mt-[140px] bg-[#D6E8EE] w-[40%] container text-center">
        <h1 className="flex text-4xl font-mono justify-center mt-44 font-bold">
          LET'S FIND YOUR
          <br />
          DOCTOR
        </h1>
        <span className="cursor-pointer  flex justify-center ml-44 mt-10 font-semibold text-xl w-60 bg-[#194569] p-4  text-white hover:text-black">
          Appointment
          <ArrowForwardIcon
            style={{ marginLeft: '10px', marginTop: '5px' }}
          />
        </span>
      </div>
      <div className="mt-[140px] w-[60%] bg-white items-center">
        <img
          className="w-max h-max mt-20 ml-32"
          src={doctorImage}
          alt="logo"
        />
      </div>
    </div> */}
    </>
  );
}

export default LandingFirst;
