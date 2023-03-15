import React, { useState } from "react";
import { message } from "antd";
import axios from "../../Axios/Axios";
import Moment from "react-moment";

function SingleDoctor({ doctor, refresh, setRefresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Block doctor
  const blockDoctor = (id) => {
    console.log(id, "unblock");
    axios
      .patch(
        "/admin/blockDoctor",
        { id },
        { headers: { admintoken: adminToken } }
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          message.success(response.data.message);
          setRefresh(!refresh);
        } else {
          message.error(response.data.message);
        }
      });
  };

  // UnBlock Doctor
  const unBlockDoctor = (id) => {
    console.log(id, "unblock");
    axios
      .patch(
        "/admin/unBlockDoctor",
        { id },
        { headers: { admintoken: adminToken } }
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          message.success(response.data.message);
          setRefresh(!refresh);
        } else {
          message.error(response.data.message);
        }
      });
  };

  return (
    <tr key={doctor._id} className="">
      <td className=" p-3 text-sm w-6 text-gray-700 ">
        <div className="h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src={doctor.doctorImg}
            alt=""
          />
        </div>
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {doctor.fName}
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {doctor.email}
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {doctor.number}
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
          {" "}
          {doctor.status}
        </span>
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        <button
          onClick={handleOpenModal}
          className="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#194569] rounded-lg bg-opacity-80 hover:bg-opacity-50"
        >
          Show
        </button>
        {/* Overlay modal */}
        {isOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={handleCloseModal}
              >
                <div className="absolute inset-0 bg-gray-500 bg-opacity-70"></div>
              </div>

              {/* Modal */}
              <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md">
                <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
                  <h2 className="text-lg text-center font-medium text-gray-900">
                    Doctor Details
                  </h2>
                </div>
                <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                  <p class="text-lg font-medium pl-4  text-gray-900 truncate dark:text-white">
                    Licence
                  </p>
                  <div className=" inset-0 min-w-fit min-h-fit   flex items-center justify-center ">
                    <img
                      className="object-cover w-full rounded-t-lg   md:rounded-none md:rounded-l-lg"
                      src={doctor.licenceImg}
                      alt=""
                    />
                  </div>
                  {/*  */}

                  <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div class="flow-root">
                      <ul
                        role="list"
                        class="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        {
                          <li class="py-3 sm:py-4">
                            <div class="flex items-center space-x-4">
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-500  truncate dark:text-white">
                                  Education:
                                </p>
                                <p class="text-base font-medium text-gray-900 truncate dark:text-gray-400">
                                  {doctor.education}
                                </p>
                              </div>
                            </div>
                          </li>
                        }
                        <li class="py-3 sm:py-4">
                          <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                              <p class="text-base font-medium text-gray-500  truncate dark:text-white">
                                Specialization:
                              </p>
                              <p class="text-base font-medium text-gray-900 truncate dark:text-gray-400">
                                {doctor.specialization}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li class="py-3 sm:py-4">
                          <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium text-gray-500 truncate dark:text-white">
                                Experience
                              </p>
                              <p class="text-base font-medium text-gray-900 truncate dark:text-gray-400">
                                {doctor.experience}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li class="py-3 sm:py-4">
                          <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                              <p class="text-base font-medium text-gray-500 truncate dark:text-white">
                                Location
                              </p>
                              <p class="text-base font-medium text-gray-900 truncate dark:text-gray-400">
                                {doctor.location}
                              </p>
                            </div>
                          </div>
                        </li>
                        {doctor.status == "active" && (
                          <div>
                            <li class="py-3 sm:py-4">
                              <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                  <p class="text-sm font-medium text-gray-500 truncate dark:text-white">
                                    Address
                                  </p>
                                  <p class="text-base font-medium text-gray-900 truncate dark:text-gray-400">
                                    {doctor.address}
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li class="py-3 sm:py-4">
                              <div class="flex items-center space-x-4">
                                <div class="flex-1 min-w-0">
                                  <p class="text-sm font-medium text-gray-500 truncate dark:text-white">
                                    Available Day
                                  </p>
                                  {doctor.availablity.map((days) => (
                                    <p class="text-base font-medium text-gray-900 truncate dark:text-gray-400">
                                      {days.day},
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </li>
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/*  */}
                </div>

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
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        <Moment format="YYYY/MM/DD">{doctor.createdAt}</Moment>
      </td>

      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {doctor.block == true ? (
          <button
            onClick={() => unBlockDoctor(doctor._id)}
            className=" p-1.5 text-xs font-medium uppercase tracking-wider text-gray-100 bg-red-800 rounded-lg bg-opacity-75 cursor-pointer hover:bg-opacity-95"
          >
            Unblock
          </button>
        ) : (
          <button
            onClick={() => blockDoctor(doctor._id)}
            className=" p-1.5 text-xs font-medium uppercase tracking-wider text-gray-100 bg-red-800 rounded-lg bg-opacity-95 cursor-pointer hover:bg-opacity-75"
          >
            Block
          </button>
        )}
      </td>
    </tr>
  );
}

export default SingleDoctor;
