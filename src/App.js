/* eslint-disable react/react-in-jsx-scope */
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';

// protected and public Routes

import ClientPrivateRoutes from './Utils/ClientPrivateRoutes';
import ClientPublicRoutes from './Utils/ClientPublicRoutes';
import DoctorPrivateRoutes from './Utils/DoctorPrivateRoutes';
import DoctorPublicRoutes from './Utils/DoctorPublicRoutes';
import AdminPrivateRoutes from './Utils/AdminPrivateRoutes';
import AdminPublicRoutes from './Utils/AdminPublicRoutes';


// client pages
import LandingPage from './Pages/Client/LandingPage';
import LoginPage from './Pages/Client/LoginPage';
import SignupPage from './Pages/Client/SignupPage';
import ServicePage from './Pages/Client/ServicePage';
import DepartmentDoctorsPage from './Pages/Client/DepartmentDoctorsPage';
import DoctorDetailsPage from './Pages/Client/DoctorDetailsPage'
import ClientProfilePage from './Pages/Client/ClientProfilePage';
import AppointmentHistory from './Pages/Client/AppointmentHistory';
import ClientNotificationPage from './Pages/Client/ClientNotificationPage';

// doctor pages
import DoctorDashboardPage from './Pages/Doctor/DoctorDashboardPage';
import DoctorLogin from './Pages/Doctor/LoginPage';
import DoctorSignup from './Pages/Doctor/SignupPage';
import DoctorPendingPage from './Pages/Doctor/DoctorPendingPage';
import DoctorDetailsForm from './Pages/Doctor/DetailsFormPage'
import DoctorAppointmentsPage from './Pages/Doctor/DoctorAppointmentsPage';
import DoctorProfilePage from './Pages/Doctor/DoctorDetailsPage'
import DoctorSchedulePage from './Pages/Doctor/DoctorSchedulePage'
import AppointmentHistoryPage from './Pages/Doctor/AppointmentHistoryPage';
import DeniedUi from './Pages/Doctor/DeniedUi';

// admin pages
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminHomePage from './Pages/Admin/AdminHomePage';
import AdminClientPage from './Pages/Admin/AdminClientPage';
import AdminDoctorsPage from './Pages/Admin/AdminDoctorsPage';
import AdminInboxPage from './Pages/Admin/AdminInboxPage';
import AdminDepartmentPage from './Pages/Admin/AdminDepartmentPage';
import AdminAppointmentsPage  from './Pages/Admin/AdminAppointmentsPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* client routes */}
        <Route path="/" element={<LandingPage />} />

        <Route element={<ClientPublicRoutes/>}>

        <Route path="/login" element={<LoginPage /> } />
        <Route path="/signup" element={<SignupPage /> } />

        </Route>
         
        <Route element={<ClientPrivateRoutes/>} >

        <Route path="/service" element={  <ServicePage/> } />
        <Route path="/departmentDoctors/:departmentId" element={  <DepartmentDoctorsPage />  } />
        <Route path="/doctorDetails/:doctorId" element={  <DoctorDetailsPage /> } />
        <Route path="/clientProfile" element={ <ClientProfilePage/> }/>
        <Route path="/clientAppHistory" element={ <AppointmentHistory/> }/>
         <Route path="/clientNotificationPage" element={ <ClientNotificationPage/>}/>
         </Route>
         
         

        {/* Doctor routes */}

        <Route path="/doctor/deniedUi" element={<DeniedUi /> } />
        <Route element={<DoctorPublicRoutes/>}>

        <Route path="/doctor/doctorLogin" element={<DoctorLogin /> } />
        <Route path="/doctor/doctorSignup" element={ <DoctorSignup /> } />
         
        </Route>
        <Route element={<DoctorPrivateRoutes/>}>

        <Route path="/doctor" element={<DoctorDashboardPage /> } />
        <Route path="/doctor/DoctorProfilePage" element={<DoctorProfilePage /> } />
        <Route path="/doctor/doctorPendingPage" element={  <DoctorPendingPage />  } />
        <Route path="/doctor/doctorDetailsForm" element={<DoctorDetailsForm />  } />
        <Route path="/doctor/DoctorAppointmentsPage" element={ <DoctorAppointmentsPage />} />
        <Route path="/doctor/DoctorSchedulePage" element={<DoctorSchedulePage />} />
         <Route path="/doctor/doctorAppointmentHistory"  element={<AppointmentHistoryPage/>}/>
        </Route>
        

        {/* Admin routes */}

        <Route element={<AdminPublicRoutes/>}>
          
        <Route path="/admin" element={<AdminLoginPage /> } />

        </Route>

        <Route element={<AdminPrivateRoutes/>}>

        <Route path="/admin/adminHome" element={ <AdminHomePage />} />
        <Route path="/admin/adminClientPage" element={ <AdminClientPage />} />
        <Route path="/admin/adminDoctorsPage" element={ <AdminDoctorsPage />} />
        <Route path="/admin/AdminInboxPage" element={ <AdminInboxPage />} />
        <Route path="/admin/AdminDepartmentPage" element={ <AdminDepartmentPage />} />
        <Route path="/admin/AdminAppointmentsPage" element={ <AdminAppointmentsPage />} />

        </Route>


          

      </Routes>
    </BrowserRouter>
  );
}

export default App;
