import React from "react";
import Moment from "react-moment";
import { message, Modal } from "antd";
import axios from "../../Axios/Axios";
import profile from "../../Assets/user.png";
function SingleClient({ client, refresh, setRefresh }) {
  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;

  // Block Client
  const blockClient = (id) => {
    Modal.confirm({
      title: "Are you sure you want to Block this client?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .patch(
            "/admin/blockClient",
            { id },
            { headers: { admintoken: adminToken } }
          )
          .then((response) => {
            if (response.data.success) {
              message.success(response.data.message);
              setRefresh(!refresh);
            } else {
              message.error(response.data.message);
            }
          });
      },
      onCancel() {},
    });
  };

  // UnBlock Client
  const unBlockClient = (id) => {
    Modal.confirm({
      title: "Are you sure you want to unBlock this client?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .patch(
            "/admin/unBlockClient",
            { id },
            { headers: { admintoken: adminToken } }
          )
          .then((response) => {
            if (response.data.success) {
              message.success(response.data.message);
              setRefresh(!refresh);
            } else {
              message.error(response.data.message);
            }
          });
      },
      onCancel() {},
    });
  };

  return (
    <tr key={client._id} className="">
      <td className=" p-3 text-sm w-6 text-gray-700 ">
        <div className="h-10 w-10">
          {client.clientImage ? (
            <img
              className="h-10 w-10 rounded-full"
              src={client.clientImage}
              alt="client"
            />
          ) : (
            <img className="h-8 w-8 rounded-full" src={profile} alt="client" />
          )}
        </div>
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {client.fName}
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {client.email}
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {client.number}
      </td>
      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        <Moment format="YYYY/MM/DD">{client.createdAt}</Moment>
      </td>

      <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {client.block === true ? (
          <button
            onClick={() => unBlockClient(client._id)}
            className=" p-1.5 text-xs font-medium uppercase tracking-wider text-gray-100 bg-red-800 rounded-lg bg-opacity-75 cursor-pointer hover:bg-opacity-95"
          >
            Unblock
          </button>
        ) : (
          <button
            onClick={() => blockClient(client._id)}
            className=" p-1.5 text-xs font-medium uppercase tracking-wider text-gray-100 bg-red-800 rounded-lg bg-opacity-95 cursor-pointer hover:bg-opacity-75"
          >
            Block
          </button>
        )}
      </td>
    </tr>
  );
}

export default SingleClient;
