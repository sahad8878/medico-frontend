import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const AdminPrivateRoutes = () => {

const adminToken = JSON.parse(localStorage.getItem('adminToken'))

return (

    adminToken ? <Outlet/> : <Navigate to="/admin"/>
)
   

}

export default AdminPrivateRoutes