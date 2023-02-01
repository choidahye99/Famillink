import { useEffect, useRef, useState } from "react";
import secrets from "../secrets.json"

import useSpeechToText from "react-hook-speech-to-text"

const STT = () => {
    const API_KEY = secrets.google_speech_api_key
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        useOnlyGoogleCloud: true,
        googleApiKey: API_KEY,
        googleCloudRecognitionConfig: {
            languageCode: 'ko-KR'
          }
      });
    
    useEffect(() => {
        console.log(results)
        console.log(results[-1])
    },[results])

      if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

      return (
        <div>
          <h1>Recording: {isRecording.toString()}</h1>
          <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <ul>
            {results.map((result) => (
              <li key={result.timestamp}>{result.transcript}</li>
            ))}
            {interimResult && <li>{interimResult}</li>}
          </ul>
        </div>
      );
    }



export default STT;