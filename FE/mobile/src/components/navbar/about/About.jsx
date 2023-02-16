import React, {useEffect, useState} from "react";
import "./about.css";
import Image from "../../images/다운로드.jpg";
import AboutBox from "./AboutBox";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import SimpleLineIcon from "react-simple-line-icons";
import axios from "axios";
import { RiMickeyFill, RiMickeyLine } from "react-icons/ri";


const About = () => {
  const [token, setToken] = useState("")

  useEffect(() => {
    if (localStorage.getItem("faccesstoken")){

      setToken(localStorage.getItem("faccesstoken").replace(/"/gi, ""));
    }
  },[setToken])
  const [todoProfile, setTodoProfile]  = useState();

  const [todoList, setTodoList] = useState({});


  axios.get("http://i8a208.p.ssafy.io:3000/todo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    // console.log(res.data.todolist)
    setTodoList(res.data.todolist)
  }).catch((err) => {
    console.log(err)
  })

  useEffect(() => {
    if(localStorage.getItem("fmurl")) {
    setTodoProfile(localStorage.getItem("fmurl").replace(/"/gi, ""))
    }
  },[])
  return (
    <section className="about container section" id="about">
      <h2 className="section__title">오늘의 할 일</h2>
      <div className="about__container grid">
          <div className="about__info grid">
            <p className="about__description">
              혹시 잊으셨나요?
            </p>
            <Button className="btntodo">
              <Link to="/todo" className="atodo">할 일 추가</Link></Button>
          </div>
        <div className="about__data grid">
            <div className="about__todo grid">
              <div className="about__skills">
      {Object.values(todoList).map(( ele ) => {
          return (
                <div className="skills__data grid" key={ele.uid}>
                  <div className="skills__titles">
                    <div className="skiils__icons">
                      {ele.status === 1 ? <RiMickeyFill /> : <RiMickeyLine />}                    </div>
                    <h3 className="skills__name">{ele.content}</h3>
                  </div>
                </div>
                  );
              })}
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
