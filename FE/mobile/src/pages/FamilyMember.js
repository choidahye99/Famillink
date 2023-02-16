import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { familyMemberProfile, familyMemberName } from "../modules/token";
// import Me from "/images/댜운로드.jpg";



const StyledFM = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  `
  
  const StyledForm = styled.form`
  padding: 0;
height:90vh;
width: 60vh;
background: #fff;
display: grid;
grid-template-rows: 1fr 4fr 1fr;
flex-direction: column;
align-items: center;
text-align: center;
justify-content: center;
border-radius: 15px;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  `

  const StyledImg = styled.img`
  width: 13vh;
  height: 13vh;
  border-radius: 100%;
  margin: auto;
  // margin-bottom: 1.5rem;
`
const StyledGrid = styled.div`
// margin:8vh;
padding: 1vh;
display: grid;
justify-content: center;
grid-template-rows: 1fr;
grid-template-columns: 1fr 1fr;
`

const StyledDiv = styled.div`
height: 20vh;
width: 20vh;
padding: 0;
margin: 10px;
border-radius: 15px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
text-align: center;
box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
background: #fff;
cursor: pointer;


&:hover {
  background-color: #ffd8a8;
  box-shadow: 10px 8px 15px 0px  #white;
  transition: .5s;
  p{
    color:white;
  }
}`
const Styledtext = styled.h2`
`
const ButtonSmall = styled(Button)`
width: 200px;
height: 40px;
align-items: center;
display: flex;
justify-content: center;
margin-left: 60px;

`


const FamilyMember = () => {
  const [profile, setProfile] = useState({});
  const [photoUrls, setPhotoUrls] = useState({});
  const [families, setFamilies] = useState({});
  const [fmname, setFmname] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const result = [];




  useEffect(() => {
    if (families && fmname) {
      axios.post(`http://i8a208.p.ssafy.io:3000/member/login/access`, {
        name:fmname.replace(/"/gi, ''),
        user_uid: families
      })
      .then((res) => {
        if(res) {
          localStorage.setItem('fmname', JSON.stringify(fmname))
          localStorage.setItem('fmurl', JSON.stringify(photoUrls[fmname]))
          // dispatch(familyMemberName(fmname))
          // dispatch(familyMemberProfile(photoUrls[fmname]))
          localStorage.setItem('fmccesstoken', JSON.stringify(res.data['access-token']))
          navigate('/')
        }
      }).catch((err) => {
        console.log(err)
      })
    }

  },[families, fmname])

  const token = localStorage.getItem("faccesstoken").replace(/"/gi, "");
  // const name = "토르"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://i8a208.p.ssafy.io:3000/account/member-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(res.data.list);
        localStorage.setItem("profile", JSON.stringify(res.data.list));
      } catch (err) {
        console.log(err);
      }
    };
    if (localStorage.getItem("profile")) {
      setProfile(JSON.parse(localStorage.getItem("profile")));
    } else {
      fetchData();
    }
  }, []);
  const requests = Object.values(profile).map(({ name }) => {
    if (!photoUrls[name]) {
      axios
        .get(`http://i8a208.p.ssafy.io:3000/photo/${name}`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const url = window.URL.createObjectURL(
            new Blob([res.data], { type: res.headers["content-type"] })
          );
          setPhotoUrls((prevUrls) => ({ ...prevUrls, [name]: url }));
        })
        .catch((err) => {
          // console.log(err)
          if(err.request.status === 400) {
            setPhotoUrls((prevUrls) => ({ ...prevUrls, [name]: "images/다운로드.jpg"}))
          }
        });
    }
  });

  const handleProfile = (event, name) => {
    event.preventDefault();
    setFamilies(localStorage.getItem('fauid').replace(/"/gi, ''));
    setFmname(name);
  };

  const handleClick = () => {
    navigate("/FamilyMemberRegister")
  }

  return (
    <>
    <StyledFM>
      <StyledForm>
        {/* <MdArrowBackIos /> */}
        <Styledtext>프로필 선택</Styledtext>
        <StyledGrid>
      {Object.values(profile).map(( ele ) => {
        if (photoUrls[ele.name]) {
          return (
            <StyledDiv key={ele.name} onClick={(event) => handleProfile(event, ele.name, ele.uid)}>
              <StyledImg
                src={photoUrls[ele.name]}
                alt={ele.name}
              />
              <p>{ele.name}</p>
            </StyledDiv>
          );
        }
        return null;
      })}
      </StyledGrid>
        <ButtonSmall onClick={handleClick}>가족 추가</ButtonSmall>
      </StyledForm>
    </StyledFM>
    </>
  );
};

export default FamilyMember;
