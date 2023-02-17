import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpSuccess from "./pages/SignUpSuccess";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthLayout from "./components/auth/AuthLayout";
import FamilyMember from "./pages/FamilyMember";
import FamilyMemberRegister from "./pages/FamilyMemberRegister";
import Record from "./pages/Record";
import Calendars from "./pages/Calendars";
import Todo from "./pages/Todo";
import QRcode from "./components/navbar/qrcode/QRcode"
import React, { useEffect, useState } from "react";
import Sidebar from "./components/navbar/sidebar/Sidebar";
import { useLocation } from "react-router-dom";



function App() {
  const [token, setToken] = useState("")

  useEffect(() => {
    if (localStorage.getItem("faccesstoken")){

      setToken(localStorage.getItem("faccesstoken"));
    }
  },[setToken])
  const location = useLocation();

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  })

  // const checkfamilymember = localStorage.getItem("")
  return (
    <div className="App">
        {/* <AuthLayout component={<Navbar />} authenticated={token} /> */}
        {["/login","/SignUp","/SignUpSuccess", "/FamilyMember", "/FamilyMemberRegister"].includes(location.pathname) ? null : <Sidebar />}
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/findpassword" element={<SignUp />} />
        <Route path="/SignUpSuccess" element={<SignUpSuccess />} />
        <Route path="/FamilyMember" element={<FamilyMember />} />
        <Route path="/todo" element={<Todo />}/>
        <Route
          path="/FamilyMemberRegister"
          element={<FamilyMemberRegister />}
        />
        <Route path="/Record" element={<Record />} />
        <Route path="/Calendars" element={<Calendars/>} />
        <Route path="/qrcode" element={<QRcode />} />
      </Routes>

    </div>
  );
}

export default App;
