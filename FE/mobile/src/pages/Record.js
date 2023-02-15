import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import styled from "styled-components";

const StyledFM = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  `

const StyledForm = styled.form`
height: 100%;
margin: 5vh;
padding: 5vh;
width: 60vh;
background: #fff;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
flex-direction: column;
border-radius: 15px;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`

const Styleddiv = styled.div`
height: 10vh;
width: 10vh;
padding: 3px;
margin: 10px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
`

const Record = () => {
  const [stream, setStream] = useState(null);
  const [video, setVideo] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        setStream(stream);
        setVideo(document.getElementById("video"));
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Error accessing camera:", error);
      });
  }, []);

  function startRecording() {
    setMediaRecorder(new MediaRecorder(stream));
    mediaRecorder.start();
    console.log("Stream", stream);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      setChunks(chunks.concat(event.data));
    });
  }

  function stopRecording() {
    mediaRecorder.stop();

    const recordedBlob = new Blob(chunks, { type: "video/webm" });
    // You can now upload the recordedBlob to your server or store it locally using the localStorage API
  }

  return (
    <StyledFM>
    <StyledForm>
        <video id="video" width="640" height="480" autoplay></video>
      <Styleddiv>
        <Button onClick={startRecording}>Start Recording</Button>
        <Button onClick={stopRecording}>Stop Recording</Button>
      </Styleddiv>
    </StyledForm>
    </StyledFM>
  );
}

export default Record;
