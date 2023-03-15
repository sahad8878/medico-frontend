import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Signup from '../../Components/Signup/ClientSignup';
import TopNav from '../../Components/TopNav/TopNav';

function SignupPage() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <TopNav />
      <Navbar />
      <Signup />
      <Footer />
    </div>
  );
}

export default SignupPage;
