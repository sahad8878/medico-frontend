import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ClientPrivateRoutes = () => {

const clientToken = JSON.parse(localStorage.getItem('clientToken'))

return (

    clientToken ? <Outlet/> : <Navigate to="/login"/>
)
   

}

export default ClientPrivateRoutes