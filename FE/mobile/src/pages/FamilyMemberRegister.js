import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './FamilyMemberRegister.css' 
import Button from "../components/common/Button";

const FamilyMemberRegister = () => {

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState(null)
  const [imageurl, setImageURL] = useState("")



  const imageInput = useRef();
  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const handleName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  }

  const handleNickname = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  }
                 
  function handleImage(e) {
    setImage(e.target.files[0])
    
  }
  function handleApi(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append('image', image )
    // formData.append()
    const token = localStorage.getItem("faccesstoken").replace(/"/gi, "")
    const body = {
      name,
      nickname,
    }
    const bodies = {
      name,
      // fuid
    }
    axios.post('http://i8a208.p.ssafy.io:3000/member/signup', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res)
      // const fuid = localStorage.getItem("fauid")
      // axios.post('http://i8a208.p.ssafy.io:3000/member/login/access', bodies)
      // .then((response) => {
      //     console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // })
      // axios.post('http://i8a208.p.ssafy.io:3000/photo', formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }).then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err)
      // })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function deleteFileImage() {
    setImage("")
  };
  
  useEffect(() => {
    if (image) {
      const imageURL = URL.createObjectURL(image)
      setImageURL(imageURL)
    }
  },[image])


  return (
    <div className="height100">
    <div className="member-registration">
      <form className="card"> 
      <h2 className="cardname">가족 멤버 등록</h2>
      {image ? (
       <label htmlFor="photo-upload" className="custom-file-upload labelfmr" onClick={onCickImageUpload}>
       <div className="img-wrap img-upload">
       <img className="imgfamily" alt="not found" id="photo-upload" width={"250px"} src={imageurl} />
       <input className="inputfmr" type="file" id="photo-upload" ref={imageInput} onChange={handleImage} />
       <br />
       <button onClick={deleteFileImage}>Remove</button>
       </div>
     </label>
        ):(
      <label htmlFor="photo-upload" className="custom-file-upload labelfmr" onClick={onCickImageUpload}>
        <div className="img-wrap img-upload">
          <img className="imgfamily" src="https://via.placeholder.com/250x250" id="photo-upload" alt="" width={"250px"} />
        </div>
        <input className="inputfmr" type="file" id="photo-upload" ref={imageInput} onChange={handleImage} />
      </label>
        )}
      <div className="field">
      <input
      className="inputfmr"
          id="name" 
          type="text"
          name="name"
          placeholder="이름"
          value={name}
          onChange={handleName}
        />
        </div>
      <div className="field">
        <input
        className="inputfmr"
          id="nickname"
          placeholder="별명"
          name="nickname"
          value={nickname}
          onChange={handleNickname}
        />
      </div>
      <Button onClick={handleApi}>추가</Button>
      </form>
      </div>
    </div>
  );
};
export default FamilyMemberRegister