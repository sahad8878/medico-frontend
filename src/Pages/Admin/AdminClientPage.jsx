import React from "react";
import AdminClient from "../../Components/AdminHome/AdminClient";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";

function AdminClientPage() {
  return (
    <>
      <div className="flex">
        <AdminNavbar />
        <div className=" pt-20 sm:pt-24">
          <AdminSidebar />
        </div>
        <div className=" pt-[88px] w-screen  sm:pt-[96px]  sm:pl-[280px]">
          <AdminClient />
        </div>
      </div>
    </>
  );
}

export default AdminClientPage;
