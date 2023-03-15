import React, { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import { message } from "antd";
import profile from "../../Assets/user.png";
import clientIcon from "../../Assets/group.ico";
import confirm from "../../Assets/customer.png";
import cancelled from '../../Assets/cancelled.png'
import axios from "../../Axios/Axios";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

function DoctorDashboard() {
  const doctor = JSON.parse(localStorage.getItem("doctorToken"));
  const doctorToken = doctor.doctorToken;
  const [totalAppointments, setTotalAppointments] = useState("");
  const [checkedAppointments, setCheckedAppointments] = useState("");
  const [canceledAppointments,setCanceledAppointments] = useState('')
const [salesReport,setSalesReport ] = useState([])
  useEffect(() => {
    axios
      .get("/doctor/getDashboardDetails", {
        headers: { doctortoken: doctorToken },
      })
      .then((response) => {
        const result = response.data;
        if (result.success) {
          setTotalAppointments(result.totalAppointments);
          setCheckedAppointments(result.checkedAppointments)
          setCanceledAppointments(result.canceledAppointments)
          setSalesReport(result.salesReport)
        
        } else {
          message.error(result.message);
        }
      });
  }, []);
  const headers = [
    { label: 'Month', key: 'month' },
    { label: 'Year', key: 'year' },
    { label: 'Total Sales', key: 'totalSales' },
  ];

  const transformData = (data, headers) => {
    return [
      ['Month', 'Year', 'Total Sales'],
      ...data.map(row => [row.month, row.year, `$${row.totalSales}`])
    ];
  };
  return (
    <div className=" ">
      <div className="flex justify-center content-center py-5">
        <h1 className="text-2xl font-serif  font-semibold">Dashboard</h1>
      </div>

      {/*  */}

      <div className=" grid grid-cols-1 lg:grid-cols-3  gap-4 p-4 mb-10">
        <div className="flex flex-col w-60 h-24 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
          <img className=" ml-4 h-14" src={clientIcon} alt="logo" />
          <div>
            <h1 className="pl-5 text-black font-bold">Totol Appointments</h1>
            <span className="flex justify-center text-black font-bold">
              {totalAppointments}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-60 h-24 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
        <img className=" ml-4 h-14" src={confirm} alt="logo" />
          <div>
            <h1 className="pl-3 text-black font-bold">Checked Appointments</h1>
            <span className="flex justify-center text-black font-bold">
              {checkedAppointments}
            </span>
          </div>

        </div>
        <div className="flex flex-col w-60 h-24 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
        <img className=" ml-4 h-14" src={cancelled} alt="logo" />
          <div>
            <h1 className="pl-4 text-black font-bold text-justify">Canceled Appointments</h1>
            <span className="flex justify-center text-black font-bold">
              {canceledAppointments}
            </span>
          </div>
        </div>
      </div>

{salesReport.length !== 0 &&
      <div className="overflow-auto rounded-lg shadow ">
        <div className="flex justify-end mr-2">
          <span className="text-[#194569]">

        <DownloadForOfflineIcon/>
          </span>
        <CSVLink className="text-[#194569]" data={salesReport} headers={headers} filename={'sales Report.csv'} transformer={transformData}>Download</CSVLink>

        </div>
        <table className="w-full  table">
          <thead className=" bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                Month
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                Year
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-center">
                Totol Sales
              </th>
            </tr>
          </thead>
          <tbody className="  bg-white divide-y divide-gray-200  ">
            {
              salesReport.map((salesReport)=> (
            <tr className="">
              <td className=" p-3 text-base text-gray-700 whitespace-nowrap text-center">
              {salesReport.month}
              </td>
              <td className=" p-3 text-base text-gray-700 whitespace-nowrap text-center">
              {salesReport.year}
              </td>
              <td className=" p-3 text-base text-gray-700 whitespace-nowrap text-center">
              {salesReport.totalSales}
              </td>
            </tr>
             ))
            }
          </tbody>
        </table>
      </div>
}
{/*  */}


      {/*  */}
    </div>
  );
}

export default DoctorDashboard;
