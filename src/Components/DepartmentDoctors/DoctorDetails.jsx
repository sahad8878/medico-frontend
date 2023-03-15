import React, { useState, useEffect } from "react";
import "./DoctorCss.css";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import axios from "../../Axios/Axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PayPalButton from "./PayPalButton";

function DoctorDetails() {
  const [Doctor, setDoctor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [token, setToken] = useState(null);
  const [schedulTime, setSchedulTime] = useState("");
  const [showPaypal, setShowPaypal] = useState(false);
  const [availableDays, setavailableDays] = useState([]);

  const navigate = useNavigate();

  const { doctorId } = useParams();
  const client = JSON.parse(localStorage.getItem("clientToken"));
  const clientToken = client.clientToken;
  useEffect(() => {
    axios
      .get(`/getDoctorDetails/${doctorId}`, {
        headers: { accesstoken: clientToken },
      })
      .then((response) => {
        if (response.data.success) {
          setDoctor(response.data.doctor);
          setavailableDays(response.data.availableDays);
        }
      });
  }, []);

  const handleAppointment = (event) => {
    try {
      event.preventDefault();
      console.log(selectedTime);

      axios
        .post(
          "/verifyAppointment",
          {
            date: selectedDate,
            timeId: selectedTime,
            doctor: doctorId,
          },
          { headers: { accesstoken: clientToken } }
        )
        .then((response) => {
          const result = response.data;

          if (result.success) {
            // navigate('/clientNotificationPage');
            setToken(result.token);
            setSchedulTime(result.schedulTime);
            setShowPaypal(true);
            message.success(result.message);
          } else {
            message.error(result.message).then(() => {});
          }
        });
    } catch (error) {
      console.log(error);
      message.error("Somthing went wrong!");
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setShowPaypal(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const activeDays = ["Monday", "Wednesday"];

  function tileClassName({ date }) {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

    if (availableDays.includes(dayOfWeek)) {
      // Active day
      if (date < new Date()) {
        return "inactive";
      }
      return "active";
    } else {
      // Inactive day
      return "inactive";
    }
  }

  function tileDisabled({ activeStartDate, date, view }) {
    if (date < new Date()) {
      return true;
    }
    // Disable all days that are not in the availableDays array
    if (
      view === "month" &&
      !availableDays.includes(date.toLocaleString("en-US", { weekday: "long" }))
    ) {
      return true;
    }
  }
  // function tileClassName({ date, view }) {
  //   // Return "active" class for active days
  //   if (view === "month" && activeDays.includes(date.toLocaleString("en-US", { weekday: "long" }))) {
  //     return "active";
  //   }
  // }
  function handleDateChange(date) {
    console.log(date);
    const selectedDay = date.toLocaleString("en-us", { weekday: "long" });
    console.log(selectedDay);
    setSelectedDate(date);
    try {
      axios
        .get(`/availableSlot/${doctorId}/${selectedDay}`, {
          headers: { accesstoken: clientToken },
        })
        .then((response) => {
          if (response.data.success) {
            setAvailability(response.data.availability);
          } else {
            message.error(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(availability);

  return (
    <>
      <div className="container mx-auto px-4 pt-7">
        <div className="flex flex-wrap ">
          {/*  */}
          <div className="w-full md:w-5/12 px-3 flex justify-center lg:justify-end">
            <div className="bg-[#E3E8EE]   mt-[80px] sm:mt-[100px]   sm:mx-4   ">
              <div className="flex justify-center flex-col text-center  ">
                <img
                  className="h-60 sm:h-72 sm:w-80 "
                  src={Doctor.doctorImg}
                  alt=""
                />
                <h1 className="text-center p-5 ">
                  {Doctor.fName} {Doctor.lName}
                </h1>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="w-full md:w-6/12  px-3">
            <div className="lg:w-[600px] md-[400px] mt-7 md:mt-[100px] bg-[#E3E8EE] pb-10 p-5 sm:p-10 ">
              <div className="mb-4 sm:flex   ">
                <span className="block sm:pr-6 text-gray-700 font-medium mb-2  text-center">
                  Specialization
                </span>
                <div className="bg-white bg-opacity-60 p-2  text-center sm:text-start w-full">
                  {Doctor.specialization}
                </div>
              </div>
              <div className="mb-4 sm:flex ">
                <span className="block text-gray-700 text-center sm:text-start font-medium mb-2 sm:pr-[50px]">
                  Education
                </span>
                <div className="bg-white bg-opacity-60 text-center sm:text-start p-2 w-full">
                  {Doctor.education}
                </div>
              </div>
              <div className="lg:flex ">
                <div className="mb-4  sm:flex lg:w-6/12">
                  <span className="block text-gray-700  text-center sm:text-start font-medium mb-2 sm:pr-[44px]">
                    Experiance
                  </span>
                  <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                    {Doctor.experience}
                  </div>
                </div>
                <div className="lg:ml-4 mb-4 sm:flex lg:w-6/12">
                  <span className="block text-gray-700  text-center sm:text-start font-medium mb-2 lg:pr-8 sm:pr-[90px]">
                    Fees
                  </span>
                  <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                    {Doctor.consultationFees}
                  </div>
                </div>
              </div>
              <div className="mb-4 sm:flex bg-opacity-60  ">
                <span className="block text-center sm:text-start text-gray-700  font-medium mb-2 sm:pr-[60px]">
                  Location
                </span>
                <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                  {Doctor.location}
                </div>
              </div>
              <div className="mb-4 sm:flex ">
                <span className="block text-center sm:text-start text-gray-700  font-medium mb-2 sm:pr-[61px]">
                  Address
                </span>
                <div className="bg-white text-center sm:text-start bg-opacity-60  p-2 w-full">
                  {Doctor.address}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 py-14 text-sm">
          <button
            onClick={handleOpenModal}
            className="py-2 px-20 text-white font-bold text-base hover:bg-opacity-75 bg-[#194569]"
          >
            BOOK
          </button>
          {isOpen && (
            <div className="fixed z-[1000] inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                <div
                  className="fixed inset-0 transition-opacity"
                  onClick={handleCloseModal}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal */}

                <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md">
                  <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
                    <h2 className="text-lg text-center font-medium text-gray-900">
                      Make Your Appointment
                    </h2>
                  </div>
                  {availableDays.length === 0 ? (
                    <div className="bg-[#EDF4FE] py-10 font-serif font-medium text-xl">
                      Not available yer
                    </div>
                  ) : (
                    <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                      <div></div>
                      <form
                        component="form "
                        className="flex-col items-center justify-center"
                        onSubmit={handleAppointment}
                      >
                        <div className="mb-4 text-center ">
                          <label
                            className=" block text-gray-700 font-medium mb-2 "
                            htmlFor="department"
                          >
                            Availabel Date
                          </label>
                          {/* <input
                          type="date"
                          value={selectedDate}
                          min={new Date()}
                          onChange={handleDateChange}
                        /> */}
                          <div className="ml-9">
                            <Calendar
                              tileDisabled={tileDisabled}
                              tileClassName={tileClassName}
                              onChange={handleDateChange}
                            />
                            {selectedDate && (
                              <p>You selected: {selectedDate.toDateString()}</p>
                            )}
                          </div>
                        </div>

                        {selectedDate && (
                          <div className="mb-4 text-center">
                            <label className="block text-gray-700 font-medium mb-2 ">
                              Select a time:
                            </label>

                            <select
                              value={selectedTime}
                              onChange={(e) => setSelectedTime(e.target.value)}
                              className
                            >
                              <option value="">--Select a time--</option>

                              {availability &&
                                availability.time.map((times) => (
                                  <option key={times.start} value={times._id}>
                                    {moment(times.start).format(" h:mm ")} To
                                    {moment(times.end).format(" h:mm ")}
                                  </option>
                                ))}
                            </select>
                          </div>
                        )}
                        <div className="mb-4 mt-10 flex justify-center">
                          {!showPaypal ? (
                            <button
                              className="bg-white  hover:bg-[#194569] text-black font-bold py-2 px-20 rounded-lg"
                              type="submit"
                              disabled={!selectedDate || !selectedTime}
                            >
                              Continue{" "}
                            </button>
                          ) : (
                            <PayPalButton
                              selectedDate={selectedDate}
                              doctorId={doctorId}
                              token={token}
                              schedulTime={schedulTime}
                              consultationFees={Doctor.consultationFees}
                              setShowPaypal={setShowPaypal}
                              handleCloseModal={handleCloseModal}
                            />
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                  <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#194569] text-base font-medium text-white hover:bg-opacity-70 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorDetails;
