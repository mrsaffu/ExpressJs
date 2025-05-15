import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./EmpList.module.css";
import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";


function EmployeeList() {
  let [empList, setempList] = useState([]);
  let navigateToDetails = useNavigate();
  let navigateToUpdate = useNavigate();

  // ! get employees

  let getEmployees = async () => {
    try {
      let empdata = await axios.get("http://localhost:5000/api/emp/getemps");
      setempList(empdata.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  //   !get empDetails by id
  let getEmployeeDetails = (eid) => {
    console.log(eid);
    navigateToDetails(`/empdetails/${eid}`);
  };

  //   ! delete employee by id
  const deletepopup = (message) => toast(message);

  let deleteEmployee = async (eid) => {
    try {
      let {
        data: { message },
      } = await axios.delete(`http://localhost:5000/api/emp/deleteemp/${eid}`);
      deletepopup(message);
      console.log(message);
      getEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  //   ! update employee by id
  let updateEmployee = (eid) => {
    navigateToUpdate(`/updateemp/${eid}`);
  };

  // ✅ Helper function to capitalize first letter
  const capitalize = (str) => {
    return str
      ? str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
  };

  return (
    <>
      <ToastContainer />

      <table>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {empList.map(({ name, age, gender, _id }, slno) => {
            return (
              <tr key={_id}>
                <td>{slno + 1}</td>
                <td>{capitalize(name)}</td>
                <td>{age}</td>
                <td>{capitalize(gender)}</td>
                <td className={style.view}>
                  <button
                    onClick={() => {
                      getEmployeeDetails(_id);
                    }}
                  >
                    View
                  </button>
                </td>
                <td className={style.update}>
                  <button
                    onClick={() => {
                      updateEmployee(_id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td className={style.delete}>
                  <button
                    onClick={() => {
                      deleteEmployee(_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default EmployeeList;
