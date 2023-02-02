import { useEffect, useRef, useState } from "react";
import secrets from "../secrets.json"

import useSpeechToText from "react-hook-speech-to-text"
import { useNavigate } from "react-router-dom";

const STT = () => {
    const API_KEY = secrets.google_speech_api_key
    const mounted = useRef(false);

    const {
        error,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        crossBrowser: true,
        useOnlyGoogleCloud: true,
        googleApiKey: API_KEY,
        googleCloudRecognitionConfig: {
            languageCode: 'ko-KR'
          }
      });

    /* const Navigate = useNavigate(); */
    
    useEffect(() => {
        startSpeechToText()

        if (!mounted.current) {
          mounted.current = true;
        } else if (results.length>0) { 
          console.log(results)
          let text = JSON.stringify(results[results.length-1]["transcript"])
          console.log(text)
             if (text.includes("녹화") || text.includes("노콰")) {
              console.log("디스패치 할 거야")
              /* Navigate("/record") */
            }
        }
      },[results])

      if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

      return (
        <div>
          <h1>Recording: {isRecording.toString()}</h1>
          
          <button onClick={startSpeechToText}>start</button>
          <button onClick={stopSpeechToText}>stop</button>
          
          <ul>
            {results.map((result) => (
              <li key={result.timestamp}>{result.transcript}</li>
            ))}
          </ul>
        </div>
      );
    }



export default STT;