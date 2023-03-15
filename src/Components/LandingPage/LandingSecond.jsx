import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import doctorImg from '../../Assets/doctor-img2.png';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


function LandingSecond() {
  const {doctor} = useSelector((state) => state.doctorLogin)

  return (
    <>
     <div className="flex flex-col md:flex-row bg-[#EDF4FE]">
          
     <div className="w-full   md:w-[50%] p-4">
        <div className=" inset-0 flex items-center justify-center p-4">
          <div className=" mb-5 lg:p-12  ">
            <img src={doctorImg} alt="" />
          </div>
        </div>
      </div>

      <div className="  w-full    md:w-[50%] flex justify-center content-center">
        <div className='lg:p-28 p-10 '>
        <h1 className=" font-serif font-bold text-3xl">MEDICO FOR PRIVATE PRACTICES</h1>
        <h2 className="mt-4 font-serif  text-3xl">
          Are you a provider interested in
          <br />
          reaching new patients?
        </h2>
       {
        doctor ? (
       <Link to ="/doctor">
       <span className="cursor-pointer  flex justify-center  mt-10 font-semibold text-xl w-52 bg-[#194569] p-2  text-white hover:text-black">
          List Your Practice
          <ArrowForwardIcon
            style={{ marginLeft: '10px', marginTop: '5px' }}
          />
        </span>
        </Link>
        )
        :(

        <Link to ="/doctor/doctorLogin">
        <span className="cursor-pointer  flex justify-center  mt-10 font-semibold text-xl w-52 bg-[#194569] p-2  text-white hover:text-black">
           List Your Practice
           <ArrowForwardIcon
             style={{ marginLeft: '10px', marginTop: '5px' }}
           />
         </span>
         </Link>
        )
        }
        </div>
      </div>
      {/*  */}
    


    </div>
    
    {/*  */}
    {/* <div className="flex bg-[#4f5e74] h-[500px] ">
      <div className="w-[50%]">
        <img className="mt-10 ml-24" src={doctorImg} alt="doctorsImg" />
      </div>
      <div className="w-[50%] text-left">
        <h1 className="flex justify-center mt-32 font-mono font-bold text-3xl">MEDICO FOR PRIVATE PRACTICES</h1>
        <h2 className="flex justify-center font-serif mt-7 text-3xl">
          Are you a provider interested in
          <br />
          reaching new patients?
        </h2>
        <span className="cursor-pointer flex justify-center ml-64 mt-10 font-semibold text-xl w-60 bg-[#194569] p-4  text-white hover:text-black">
          List your paractice
          <ArrowForwardIcon
            style={{ marginLeft: '10px', marginTop: '5px' }}
          />
        </span>
      </div>
    </div> */}
    </>
  );
}

export default LandingSecond;
