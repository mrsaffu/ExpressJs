import React, { useState } from "react";
import "./AddEmp.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AddEmp() {
  let [empData, setempData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
    conformpassword: "",
    role: "",
  });

  let [error, setError] = useState(""); // State to store backend errors

  let changeForm = ({ target: { name, value } }) => {
    setempData({ ...empData, [name]: value });
    setError(" ");
  };

  const addpopup = (message, type = "success") => toast[type](message);

  let addEmployee = async (e) => {
    e.preventDefault();
    console.log("sending data:", empData);

    try {
      let emp = await axios.post(
        "http://localhost:5000/api/emp/addemp",
        empData
      );
      addpopup(emp.data.message);

      console.log("employee details add sucess fully");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        addpopup(error.response.data.message, "error");
      } else {
        addpopup("Something went wrong!", "error");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="addCmp-mainSec">
        <form onSubmit={addEmployee} className="add-emp">
          <div className="inp">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={changeForm}
              required
            />
          </div>
          <div className="inp">
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={changeForm}
              required
            />
          </div>
          <div onChange={changeForm} className="gender">
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                required
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" id="female" />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input type="radio" name="gender" value="others" id="others" />
              <label htmlFor="others">Others</label>
            </div>
          </div>
          <div className="inp">
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              onChange={changeForm}
              required
            />
          </div>
          <div className="inp">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeForm}
              required
            />
          </div>
          <div className="inp">
            <input
              type="text"
              name="password"
              placeholder="Password"
              onChange={changeForm}
              required
            />
          </div>
          <div className="inp">
            <input
              type="text"
              name="conformpassword"
              placeholder="Confirm Password"
              onChange={changeForm}
              required
            />
          </div>
          <div className="inp">
            <label htmlFor="role"></label>
            <select name="role" id="role" onChange={changeForm}>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div className="btn">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmp;
