import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import Header from "./Components/Header";
import HomePAge from "./Components/HomePage";
import Footer from "./Components/Footer";
import Listing from "./Components/Listing";
import Properties from "./Components/Properties";
import MyProfile from "./Components/MyProfile";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import FAQ from "./Components/FAQ";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import Dashboard from "./Components/Dashboard";
import Myproperties from "./Components/Myproperties";
import MyFavorites from "./Components/MyFavorites";
import Reviews from "./Components/Reviews";
import Addproperty from "./Components/Addproperty";
import Adddetails from "./Components/Adddetails";


// import SignInotp from "./Components/SignInotp";






function App() {



  return (
    <Routes>

       <Route path="/" element={<Navigate to="/home" replace />} />
      <Route exact path="/header" element={<Header />} />
      <Route exact path="/home" element={<HomePAge />} />
      <Route exact path="/footer" element={<Footer />} />
      <Route exact path="/listing" element={<Listing />} />
      <Route exact path="/property/:id" element={<Properties />} />
      <Route exact path="/myprofile" element={<MyProfile />} />
      <Route exact path="/aboutus" element={<AboutUs />} />
      <Route exact path="/contactus" element={<ContactUs />} />
      <Route exact path="/FAQ" element={<FAQ />} />
      <Route exact path="/Privacy-Policy" element={<PrivacyPolicy />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/myproperties" element={<Myproperties />} />
      <Route exact path="/myfavorites" element={<MyFavorites />} />
      <Route exact path="/reviews" element={<Reviews />} />
      <Route exact path="/addproperty" element={<Addproperty />} />
    {/* <Route exact path="/signinotp" element={<SignInotp />} /> */}
    <Route exact path="/add" element={<Adddetails />} />
    





    </Routes>
  );
}

export default App;