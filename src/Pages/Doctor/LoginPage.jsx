import React from 'react';
import Footer from '../../Components/Footer/Footer';
import DoctorLogin from '../../Components/Login/DoctorLogin';
import Navbar from '../../Components/Navbar/Navbar';
// import Nav from '../../Components/Navbar/Nav';
import TopNav from '../../Components/TopNav/TopNav';

function LoginPage() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <TopNav />
      <Navbar />
      <DoctorLogin />
      <Footer />
    </>
  );
}

export default LoginPage;
