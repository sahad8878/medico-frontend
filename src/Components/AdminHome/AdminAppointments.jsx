import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "../../Axios/Axios";

function AdminAppointments() {
  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    axios
      .get("/admin/getAllAppointments", { headers: { admintoken: adminToken } })
      .then((response) => {
        if (response.data.success) {
          setAppointments(response.data.appointments);
        } else {
          message.error(response.data.error);
        }
      });
  }, []);

  return (
    <>
      <div className=" p-6 sm:p-16 h-screen border-gray-200  ">
        <h1 className="font-semibold text-center sm:text-left mb-2 pb-9 font-serif text-2xl">
          Appointments
        </h1>
        <div className="pb-11">
          {appointments.length === 0 ? (
            <div className="flex  justify-center  font-serif text-[#194569] text-xl ">
              Appointments details are empty...!
            </div>
          ) : (
            <div className="overflow-auto rounded-lg shadow  ">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Doctor Name
                    </th>
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className=" bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr className="">
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appointment.doctor.fName}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appointment.client.fName}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appointment.date}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appointment.time}
                      </td>

                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appointment.consultationFees}
                      </td>
                      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appointment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminAppointments;
