import React from "react";
import "./navbar.css";
import Sidebar from "./sidebar/Sidebar";
import Home from "./home/Home";
import About from "./about/About";
import Services from "./services/Services";
import Resume from "./resume/Resume";
import Portfolio from "./portfolio/Portfolio";
import Testimonials from "./testmonials/Testimonials";
import QRcode from "./qrcode/QRcode"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function handleQRClick() {
    navigate('/qrcode')
  }
  return (
    <>
      {/* <Sidebar /> */}
      <main className="main">
        <Home />
        <About />
        <Services />
        {/* <Resume />
        <Portfolio />
        <Testimonials /> */}
        <div onClick={handleQRClick}>
        <QRcode />
        </div>
      </main>
    </>
  );
};
export default Navbar;
