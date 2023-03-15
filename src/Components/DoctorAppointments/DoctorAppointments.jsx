import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Moment from "react-moment";
import axios from "../../Axios/Axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Store/Slice/ClientSlice";



function DoctorAppointments() {
  const dispatch = useDispatch();
  const [Appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doctor = JSON.parse(localStorage.getItem("doctorToken"));
  const doctorToken = doctor.doctorToken;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/doctor/getAppointments`, {
        headers: { doctortoken: doctorToken },
      })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setAppointments(response.data.pendingAppointments);
        } else {
          message.error(response.data.error);
        }
      });
  }, [refresh]);

  // mark as ckecked  appointment
  const checkedAppointment = (id) => {
    axios
      .patch(
        "/doctor/checkedAppointment",
        { id },
        { headers: { doctortoken: doctorToken } }
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

  // cancel appointment requests

  const cancelAppointment = (id) => {
    axios
      .patch(
        "/doctor/cancelAppointment",
        { id },
        { headers: { doctortoken: doctorToken } }
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.count,"countttttt");
          dispatch(
            setLogin({
              client:"client",
            count:response.data.count
             
            })
          );
          message.success(response.data.message);
          setRefresh(!refresh);
        } else {
          message.error(response.data.message);
        }
      });
  };

  return (
    <div className=" ">
      <div className="flex justify-center content-center py-8">
        <h1 className="text-2xl font-serif  font-semibold">Appointments</h1>
      </div>

      {/*  */}
      {isLoading ? (
        <div className=" flex justify-center">
          <InfinitySpin width="200" color="#194569" />
        </div>
      ) : (
        <div>
          {Appointments.length === 0 ? (
            <div>
              <div className="flex pt-28 justify-center font-serif text-[#194569] text-xl">
                Appointments Not Exist..! check your history
              </div>
              <div className=" flex justify-center mt-4 content-end">
                <Link to="/doctor/doctorAppointmentHistory">
                  <h1 className="text-end py-1 px-3 text-white bg-[#194569] cursur-pointer hover:bg-opacity-80 m-2">
                    History
                  </h1>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className=" flex justify-end content-end">
                <Link to="/doctor/doctorAppointmentHistory">
                  <h1 className="text-end py-1 px-3 text-white bg-[#194569] cursur-pointer hover:bg-opacity-80 m-2">
                    History
                  </h1>
                </Link>
              </div>
              <div className="overflow-auto rounded-lg shadow mb-8 ">
                <table className="w-full">
                  <thead className=" bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Name
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Gender
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Age
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Appointment Date
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">
                        Appointment Time
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
                          {appointment.client.fName}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.client.sex}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.client.age}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.date}
                        </td>
                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          {appointment.time}
                        </td>
                        <td className=" p-3 text-[#194569]   whitespace-nowrap cursor-pointer hover:underline">

                          <span 
                          class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                          data-te-toggle="tooltip"
                          title="Mark as Checked"
                          onClick={() => checkedAppointment(appointment._id)}
                          >
                            {appointment.status} <TouchAppIcon/>
                          
                          </span>
   
    
                        </td>

                        <td className=" p-3 text-base text-gray-700 whitespace-nowrap">
                          <td className=" p-3 text-base text-gray-700 whitespace-nowrap cursor-pointer">
                            {/* <button
                              onClick={() => acceptAppointment(appointment._id)}
                              className="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#194569] rounded-lg bg-opacity-80 hover:bg-opacity-50"
                            >
                              Accept
                            </button> */}

                            <button
                              onClick={() => cancelAppointment(appointment._id)}
                              className="p-1.5 ml-5 text-xs font-medium uppercase tracking-wider text-white bg-red-500 rounded-lg bg-opacity-80 hover:bg-opacity-50"
                            >
                              cancel
                            </button>
                          </td>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {/*  */}
    </div>
  );
}

export default DoctorAppointments;
