import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Login from '../../Components/Login/ClientLogin';
import Navbar from '../../Components/Navbar/Navbar';
import TopNav from '../../Components/TopNav/TopNav';

function LoginPage() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="overflow-hidden">
      <TopNav />
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
}

export default LoginPage;
