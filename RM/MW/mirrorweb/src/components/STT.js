import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import secrets from "../secrets.json"
import axios from "axios";

const STT = () => {
    const API_KEY = secrets.google_speech_api_key
    const sttURL = `https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${API_KEY}`

    const firMounted = useRef(false);
    const secMounted = useRef(false);

    const [blobData, setBlob] = useState(null);
    const [base64Data, setBase64] = useState("")

    useEffect(() => {
        if (!firMounted.current) {
            firMounted.current = true;
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(blobData); 
            reader.onloadend = () => {
	            const base64data = reader.result;
	            // base64 converted!
	            setBase64(base64data.slice(22))
            }
        }

    },[blobData])

    useEffect(() => {
        if (!secMounted.current) {
          secMounted.current = true;
        } else {
          const requestBody = {
              "audio" : {
                "content": base64Data
              },
              "config": {
                "enableAutomaticPunctuation": true,
                "encoding": "LINEAR16",
                "languageCode": "ko-KR",
                "model": "default"
              }
            }
            console.log(base64Data)
          axios.post(sttURL, requestBody)
          .then((response) => {
            console.log(response)
    
          })
          .catch((err) => {
              console.log(err)
          })
        }
      },[base64Data])

  return (
    <div>
    <ReactMediaRecorder
      audio
      onStop={(blobUrl, blob) => {  
        console.log(blob);
        setBlob(blob)
    }}
      render={({ status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <button onClick={clearBlobUrl}>Clear Blob</button>
          <audio src={mediaBlobUrl} controls autoPlay loop />
        </div>
      )}
    />
  </div>
  );
};

export default STT;