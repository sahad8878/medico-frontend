import React from "react";
import AdminDoctors from "../../Components/AdminHome/AdminDoctors";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";

function AdminClientPage() {
  return (
    <>

       <div className="flex">
        <AdminNavbar />
        <div className=' pt-20 sm:pt-24'>
        <AdminSidebar/>
        </div>
        <div className=" pt-[88px] w-screen  sm:pt-[96px]  sm:pl-[280px]">
        <AdminDoctors/>
        </div>
      </div>
     
    </>
  );
}

export default AdminClientPage;