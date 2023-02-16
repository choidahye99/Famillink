import React, {useEffect, useState} from "react";
import "./service.css";
import Image from "../../images/다운로드.jpg";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import SimpleLineIcon from "react-simple-line-icons";
import axios from "axios";
import { MdDateRange } from "react-icons/md";


const data = [
    {
        id: 1,
        day: "02월 18일",
        content: "공통 프로젝트 발표",
    },
    {
        id: 2,
        day: "02월 28일",
        content: "아버지 생신!!",
    },
    {
        id: 3,
        day: "03월 03일",
        content: "가족 외식",
    },
    {
        id: 4,
        day: "03월 16일",
        content: "할아버지댁 방문",
    },

]

const Service = () => {

  return (
    <section className="services container section" id="services">
      <h2 className="section__title">일 정</h2>
      <div className="services__container grid">
        {data.map(({id, day, content}) => {
            return (
                <div className="services__card" key={id}>
                    <h3 className="services__title">{day}</h3>
                    <p className="services__description">{content}</p>
                </div>
            )
        })}
        </div>
    </section>
  );
};

export default Service;
