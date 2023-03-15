import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import axios from "../../Axios/Axios";

function ExperiencedDoctors() {
  const [Doctors, setDoctors] = useState([]);

  const client = JSON.parse(localStorage.getItem("clientToken"));
  const clientToken = client.clientToken;
  useEffect(() => {
    axios
      .get("/getExperiencedDoctors", { headers: { accesstoken: clientToken } })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.doctors);
          setDoctors(response.data.doctors);
        }
      });
  }, []);

  const scrollLeft = () => {
    document.getElementById("contents").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("contents").scrollLeft += 400;
  };

  return (
    <div className="  bg-[#D6E8EE] py-16">
      <h1 className="font-bold text-center font-serif text-2xl  ">
        Our Experienced Doctors
      </h1>

      <div className="relative ">

        {
          Doctors.length === 0 ?
          <div className="flex p-16 justify-center font-serif text-[#194569] text-xl">  experianced doctors not exist...!</div>
       :
       <div>
        <div
          id="contents"
          className="carousel p-4 pt-10 flex items-center justify-center overflow-x-auto scroll-smooth  scrollbar-hide"
        >
          {Doctors.map((doctor) => (
            <div key={doctor._id}>
              <div className="card bg-[#EDF4FE] w-[180px] h-[280px] mx-8 rounded-lg shadow-lg  cursor-pointer">
                <div className="top">
                  <img
                    className="w-[180px] h-[180px] object-cover  p-2"
                    src={doctor.doctorImg}
                    alt="img"
                  />
                </div>
                <div className="bottom flex flex-col justify-center items-center p-3 bg-">
                  <h1 className="text-center text-lg font-sans font-medium">
                    {doctor.fName} {Doctors.lName}
                  </h1>
                  <h1 className="text-center text-lg p-2 font-normal">
                    {doctor.education}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex justify-center pt-5 ">
          <button
            onClick={scrollLeft}
            className="p-2 m-2 rounded-full bg-white"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 m-2 rounded-full bg-white"
          >
            <FiChevronRight />
          </button>
        </div>
        </div>
        }
      </div>
    </div>
  );
}

export default ExperiencedDoctors;
