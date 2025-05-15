import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./EmployeeUpdate.css"

const EmployeeUpdate = () => {
  let [emp, setemp] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
    role: "",
  });
  let  navigateToEmpList = useNavigate()

  console.log(emp);
  let { id } = useParams();

  //! getting single emp

  let getEmployee = async () => {
    try {
      let {
        data:{data }} = await axios.get(`http://localhost:5000/api/emp/getemp/${id}`);
      setemp(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  //!-----------------

  let changeForm = ({ target: { name, value } }) => {
    setemp({ ...emp, [name]: value });
  };

  const updatepopup = (message) => toast(message);

  let updateEmployee = async (e) => {
    e.preventDefault();
    try {
      let {
        data: { message },
      } = await axios.put(`http://localhost:5000/api/emp/updateemp/${id}`, emp);
      updatepopup(message);
      setTimeout(()=>{
      navigateToEmpList(`/employeelist`);

      },1000)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mainSec">
      <ToastContainer />
      <form onSubmit={updateEmployee} className="add-emp">
        <div className="inp">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={emp.name}
            onChange={changeForm}
          />
        </div>
        <div className="inp">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={emp.age}
            onChange={changeForm}
          />
        </div>
        {/* <div  onChange={changeForm} className='gender'>
            <div>
            <input type="radio" name='gender' value="male" id='male'/><label htmlFor="male">Male</label>
            </div>
            <div>
            <input type="radio" name='gender' value="female" id='female'/><label htmlFor="female">Female</label>
            </div>
            <div>
            <input type="radio" name='gender' value="others" id='others'/><label htmlFor="others">Others</label>
            </div>
        </div> */}
        <div className="inp">
          <input
            type="tel"
            name="mobile"
            value={emp.mobile}
            placeholder="Mobile"
            onChange={changeForm}
          />
        </div>
        <div className="inp">
          <input
            type="email"
            name="email"
            value={emp.email}
            placeholder="Email"
            onChange={changeForm}
          />
        </div>

        <div className="inp">
          <label htmlFor="role"></label>
          <select name="role" id="role" value={emp.role} onChange={changeForm}>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="btn">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeUpdate;
