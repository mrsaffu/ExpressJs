import React, { useEffect, useState } from "react";
import style from "./EmpDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const EmpDetails = () => {
  let [emp, setemp] = useState({});
  let { id } = useParams();
console.log(emp);
  let getEmployee = async () => {
    try {
      let {
        data: { data }} = await axios.get(`http://localhost:5000/api/emp/getemp/${id}`);
      setemp(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

   const capitalize = (str) => {
    return str
      ? str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
  };

  return (
    <div className={style.detailsSec}>
      <div className={style.detailsCont}>
        <h2>Employee Details</h2>
        <div>
        <h1>name : {capitalize(emp.name)}</h1>
          <h1>age : {emp.age}</h1>
          <h1>gender : {capitalize(emp.gender)}</h1>
          <h1>mobile: {emp.mobile}</h1>
          <h1>email : {emp.email}</h1>
          <h1>role : {capitalize(emp.role)}</h1>
        </div>
      </div>
    </div>
  );
};

export default EmpDetails;
