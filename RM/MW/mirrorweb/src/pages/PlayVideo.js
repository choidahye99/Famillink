import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { formControlClasses } from "@mui/material";



const PlayVideo = () => {

    const navigate = useNavigate();
    const [videoURL,setURL] = useState("")

    useEffect(() => {
  
            axios({
                url: "http://i8a208.p.ssafy.io:3000/movie/14",
    
                /* headers: {
                    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImxldmVsIjoiYWNjb3VudCIsImlhdCI6MTY3NTA2MDg4OSwiZXhwIjoxNjg1MDYwODg5fQ.OhUbJt41_G4V93jsjDDNHz3BCd5ZOQBcFRBNfbwVV5I"
                } */
            })
            .then((res) => {
                console.log(res)
                const base64Data = Buffer.from(res.data).toString("base64")
                setURL(() => {
                    return `data:video/mp4;base64,${base64Data}`
                })
                console.log(videoURL)
                /* let blob = new Blob([JSON.stringify(res.data)], {type:"video/mp4"})
                const url = window.URL.createObjectURL(blob)
                const base64Data = Buffer.from(res.data).toString("base64")
                console.log(base64Data)
                let blob = new Blob([base64Data], {type:"video/mp4"}); */
       
                /* console.log(url)
                setURL(() => url) */
                
            })
            .catch((err) => {
                console.log(err)
            })
        
    },[])

    const download = () => {
        const a = document.createElement("a")
        a.href = videoURL
        a.download = "reocord.mp4"
        a.click()
        a.remove()
        window.URL.revokeObjectURL(videoURL);
    }

    useEffect(() => {
        console.log(videoURL)
    }, [videoURL])

    const videoList = useState(2)
    const [nowplaying, setVideo] = useState(0)
    

    const nextVideo = (video, nowplaying) => {
        if (nowplaying === video.length -1) {
            navigate("/")
        } else {
            setVideo(nowplaying +1)
        }
    }

      

    return (
        <div>
          <video controls
          src={videoURL}
          >
          </video>
          <ReactPlayer
            url = {videoURL}
            muted={false}
            playing
            controls
            progressInterval={1000}
            onEnded={() => {nextVideo(videoList, nowplaying)}}
          />
          <button onClick={download}>다운로드</button>
     
          
        </div>
        
     );
}
 
export default PlayVideo;