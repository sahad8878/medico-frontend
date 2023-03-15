import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const AdminPublicRoutes = () => {

const adminToken = JSON.parse(localStorage.getItem('adminToken'))

return (

    adminToken ? <Navigate to="/admin/adminHome"/> :  <Outlet/>
)
   

}

export default AdminPublicRoutes