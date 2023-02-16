import React, { useState, useEffect } from "react";
import "./qrcode.css";
import axios from "axios";
import Button from "../../common/Button";

const Blog = () => {
  const [showQR, setShowQR] = useState(false);
  const [token, setToken] = useState("")

  useEffect(() => {
    if (localStorage.getItem("faccesstoken")){

      setToken(localStorage.getItem("faccesstoken").replace(/"/gi, ""));
    }
  },[setToken])

  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${token}&chs=500x500`;

  const handleQRClick = () => {
    setShowQR(true);
  };

  return (
    <div className="height100">
    <div className="qrcode">
      {showQR ? (
        <img src={qrCodeUrl} alt="QR code" className="qrimg"/>
      ) : (
<div></div>
        )}
        <br />
        <Button onClick={handleQRClick} className="qrbtn">QR코드 생성</Button>
    </div>
    </div>
  );
};

export default Blog;
