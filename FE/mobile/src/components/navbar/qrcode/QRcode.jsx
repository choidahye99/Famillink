import React, { useState } from "react";
import "./qrcode.css";
import axios from "axios";
import Button from "../../common/Button";

const Blog = () => {
  const [showQR, setShowQR] = useState(false);
  const faccessToken = localStorage.getItem("faccesstoken").replace(/"/gi, "");
  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${faccessToken}&chs=500x500`;

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
