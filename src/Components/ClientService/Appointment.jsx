import React from "react";


function Appointment(props) {

  return (
    <div className=" bg-[#EDF4FE]">
        <div className="flex-col flex sm:flex-row  justify-center content-center">

        <div className="py-12 px-10 sm:py-36 flex justify-center">
          <h1 className=" text-4xl font-serif font-bold ">
            Prepare for your appointment
          </h1>
        </div>
          <div className="  sm:pl-0 flex justify-center pb-20 pr-8 sm:py-36">
          <button onClick={props.scrollToFirstComponent} className="cursor-pointer    font-semibold text-xl    bg-[#194569] p-4  text-white hover:text-black">
            Schedule Your Time
          </button>
        </div>
        </div>
    
    </div>
  );
}

export default Appointment;
