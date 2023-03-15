import React, { useState, useEffect } from "react";
import axios from "../../Axios/Axios";
import SingleDoctor from "./SingleDoctor";

function AdminDoctors() {
  const [doctors, setdoctors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;
  useEffect(() => {
    axios
      .get("/admin/getDoctorsDetails", { headers: { admintoken: adminToken } })
      .then((response) => {
        console.log(response.data);
        setdoctors(response.data.doctors);
      });
  }, [refresh]);

  return (
    <>
      <div className=" p-6 sm:p-16 h-screen border-gray-200 ">
        <h1 className="font-semibold text-center sm:text-left mb-2 pb-9 font-serif text-2xl">
          Doctors
        </h1>
        {doctors.length === 0 ? (
          <div className="flex  justify-center  font-serif text-[#194569] text-xl ">
            Doctors details are empty...!
          </div>
        ) : (
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className=""></th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Email
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Phone
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    status
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Details
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Date
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody className=" bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <SingleDoctor
                    doctor={doctor}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDoctors;
