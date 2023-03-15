import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import DoctorSignup from '../../Components/Signup/DoctorSignup';
import TopNav from '../../Components/TopNav/TopNav';

function SignupPage() {
  return (
    <>
      <TopNav />
      <Navbar />
      <DoctorSignup />
      <Footer />

    </>
  );
}

export default SignupPage;
