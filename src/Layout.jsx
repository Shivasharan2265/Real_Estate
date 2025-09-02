import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* This renders the child page */}
      <Footer />
    </>
  );
};

export default Layout;
