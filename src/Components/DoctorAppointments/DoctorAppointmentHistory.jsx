import React, { useEffect, useState } from "react";
import { message } from "antd";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

import axios from "../../Axios/Axios";

function DoctorAppointmentHistory() {
  const [Appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doctor = JSON.parse(localStorage.getItem("doctorToken"));
  const doctorToken = doctor.doctorToken;
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`/doctor/getDoctorAppointmentHistory`, {
        headers: { doctortoken: doctorToken },
      })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setAppointments(response.data.appointmentHistory);
        } else {
          message.error(response.data.message);
        }
      });
  }, [refresh]);

  return (
    <div className=" ">
      <div className="flex justify-center content-center py-8">
        <h1 className="text-2xl font-serif  font-semibold">
          Appointments History
        </h1>
      </div>

      {isLoading ? (
        <div className=" flex justify-center">
          <InfinitySpin width="200" color="#194569" />
        </div>
      ) : (
        <div>
          {Appointments.length === 0 ? (
            <div>
            <div className="flex pt-28 justify-center font-serif text-[#194569] text-xl">
              History is empty..!
            </div>
            <div className=" flex justify-center mt-4 content-end">
                <Link to="/doctor/DoctorAppointmentsPage">
                  <h1 className="text-end py-1 px-3 text-white bg-[#194569] cursur-pointer hover:bg-opacity-80 m-2">
                    Back
                  </h1>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-auto rounded-lg shadow mb-4">
              <table className="w-full">
                <thead className=" bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Patient Name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Appointment Date
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Appointment Time
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Consultation Fees
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      status
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="  bg-white divide-y divide-gray-200 ">
                  {Appointments.map((appointment) => (
                    <tr className="">
                      <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                        {appointment.client.fName}
                      </td>
                      <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                        {appointment.date}
                      </td>
                      <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                        {appointment.time}
                      </td>
                      <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                        {appointment.consultationFees}
                      </td>
                      <td className={` ${appointment.status === "cancelled" ? "text-red-600" : "text-[#194569]" } p-3  text-gray-700 whitespace-nowrap`}>
                        {appointment.status}
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorAppointmentHistory;
