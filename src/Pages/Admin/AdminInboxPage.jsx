import React from "react";
import AdminInbox from "../../Components/AdminHome/AdminInbox";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";

function AdminInboxPage() {
  return (
    <>
     <div className="flex">
        <AdminNavbar />
        <div className=' pt-20 sm:pt-24'>
        <AdminSidebar/>
        </div>
        <div className=" pt-[88px] w-screen  sm:pt-[96px]  sm:pl-[280px]">
        <AdminInbox/>

        </div>
      </div>

    
    </>
  );
}

export default AdminInboxPage;