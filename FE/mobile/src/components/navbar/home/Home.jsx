import React, {useState, useEffect} from "react";
import "./home.css";
import Me from "../../images/다운로드.jpg";
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
// import { useSelector } from "react-redux";

const Home = () => {
    // const { fmpf, fmnm } = useSelector(({ token }) => ({
    //     fmpf: token.familymemberprofile,
    //     fmnm: token.familymembername,
    //   }))
    const [sidebarProfile, setSidebarProfile]  = useState();
    const [sidebarName, setSidebarName] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("fmurl")) {
      setSidebarProfile(localStorage.getItem("fmurl").replace(/"/gi, ""))
      setSidebarName(localStorage.getItem("fmname").replace(/"/gi, ""))
        }
        else {
            navigate('/login')
        }
    },[])

    function handleRecord() {
        navigate('/Record')
    }
  
    return (
        <section className="home container" id="home">
            <div className="intro">
                <img src={sidebarProfile} alt="" className="home__img" />
                <h1 className="home__name">{sidebarName}</h1>
                <span className="home__education">안녕하세요 {sidebarName}님</span>
            
            <HeaderSocials />
            
            <Button onClick={handleRecord}>영상 녹화</Button>
            
            <ScrollDown />
            </div>
        </section>
    )
}

export default Home;