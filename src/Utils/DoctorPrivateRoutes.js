import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const DoctorPrivateRoutes = () => {

const doctorToken = JSON.parse(localStorage.getItem('doctorToken'))

return (

    doctorToken ? <Outlet/> : <Navigate to="/doctor/doctorLogin"/>
)
   

}

export default DoctorPrivateRoutes