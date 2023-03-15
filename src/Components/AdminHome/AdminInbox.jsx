import React, { useState, useEffect } from "react";
import { message } from "antd";

import axios from "../../Axios/Axios";
import SingleInbox from "./SingleInbox";

function AdminInbox() {
  const [penDoctors, setpenDoctors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;
  useEffect(() => {
    axios
      .get("/admin/getPendingDoctors", { headers: { admintoken: adminToken } })
      .then((response) => {
        if (response.data.success) {
          setpenDoctors(response.data.pendingDoctors);
        } else {
          message.error(response.data.error);
        }
      });
  }, [refresh]);

  return (
    <>
      <div className=" p-6 sm:p-16 h-screen border-gray-200 ">
        <h1 className="font-semibold text-center sm:text-left mb-2 pb-9 font-serif text-2xl">
          Inbox
        </h1>
        {penDoctors.length === 0 ? (
          <div className="flex  justify-center  font-serif text-[#194569] text-xl ">
            Inbox is empty...!
          </div>
        ) : (
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
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
                    Department
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Location
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Licence
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Date
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody className=" bg-white divide-y divide-gray-200">
                {penDoctors.map((penDoctor) => (
                  <SingleInbox
                    penDoctor={penDoctor}
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

export default AdminInbox;
