import React, {useEffect, useRef, useState} from 'react';


import mqtt from "precompiled-mqtt";
import axios from "axios"

function MQTT() {
  const URL = "ws://localhost:9001";
  const client = mqtt.connect(URL);

  

  const [userList, setList] = useState([]);
  const [validData,setValid] = useState({
    "image": ""
  })
  const [isValid, setOkay] = useState(false)

  const mounted = useRef(false);


  // 브로커에 연결되면
  client.on('connect', () => {
    client.subscribe("/local/face/result/", function (err) {
      if (err) {
        console.log(err)
      }
    })
  })
  
  client.on('message', function (topic, message) {
    let name = JSON.parse(message).name
    setList( function(preState) {
      return [...preState, name]
    })
    if (userList.length >= 10) {
      setList(function(preState) {
       return preState.slice(0,10)
      })   
    }
    if ((userList.filter(user => user !== userList[0])).length ===0) {
      let image = JSON.parse(message).image
      if (image) {
        setValid((validData) => {
          return {
            ...validData,
            ["image"]: image,
          }
        })
      }
      setOkay(true);
    }
  })

  useEffect(() => {

  },[])

  useEffect(() =>{
    // 마운트 됐을 때는 실행 안 함
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const sendData = JSON.stringify(validData)
      console.log(sendData)
      axios({
        method: "get",
        url: "이름을 포함한 url",
        header: "",
        data: sendData
        }
      )
      .then((res) => {
        console.log(res)
        // 정보 저장
      })
      .catch((err) => {
        // 에러 처리
        console.log(err)
      })
    }
  },[isValid])
}


export default MQTT;