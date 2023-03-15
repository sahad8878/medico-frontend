import React, { useEffect, useState } from "react";
import { message } from "antd";
import { InfinitySpin } from "react-loader-spinner";
import Moment from "react-moment";
import axios from "../../Axios/Axios";

function ClientAppHistory() {
  const [Appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const clientloc = JSON.parse(localStorage.getItem("clientToken"));
  const clientToken = clientloc.clientToken;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/getConfirmedAppointments`, {
        headers: { accesstoken: clientToken },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.confirmedAppointments);
          setAppointments(response.data.confirmedAppointments);
          setIsLoading(false);
        } else {
          message.error(response.data.message);
        }
      });
  }, [refresh]);

  const cancelAppointment = (id) => {
    axios
      .patch(
        "/patchCancelAppointment",
        { id },
        { headers: { accesstoken: clientToken } }
      )
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          setRefresh(!refresh);
        } else {
          message.error(response.data.message);
        }
      });
  };
  return (
    <div className=" p-5 sm:p-20 pb-10">
      <div className="bg-[#D6E8EE] mb-11">
        <div className="flex justify-center content-center py-8">
          <h1 className="text-2xl font-serif  font-semibold">Appointments</h1>
        </div>

        {isLoading ? (
          <div className=" flex justify-center">
            <InfinitySpin width="200" color="#194569" />
          </div>
        ) : (
          <div>
            {Appointments.length === 0 ? (
              <div className="flex p-16 justify-center font-serif text-[#194569] text-xl">
                No Appointments Yet..
              </div>
            ) : (
              <div className="overflow-auto rounded-lg shadow px-20 pb-20">
                <table className="w-full  ">
                  <thead className=" bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Doctor Name
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
                      <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="  bg-white divide-y divide-gray-200 ">
                    {Appointments.map((appointment) => (
                      <tr className="">
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.doctor.fName}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          <Moment format="YYYY/MM/DD">
                            {appointment.date}
                          </Moment>
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.time}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.consultationFees}
                        </td>
                        <td
                          className={` ${
                            appointment.status === "cancelled" && "text-red-600"
                          } ${
                            appointment.status === "confirmed" &&
                            "text-[#194569]"
                          }  p-3 text-base text-black whitespace-nowrap`}
                        >
                          {appointment.status}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.status === "confirmed" && (
                            <span
                              onClick={() => cancelAppointment(appointment._id)}
                              className=" rounded-lg bg-red-400 px-1 text-white cursor-pointer text-sm hover:bg-opacity-70"
                            >
                              CANCEL
                            </span>
                          )}
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
    </div>
  );
}

export default ClientAppHistory;
