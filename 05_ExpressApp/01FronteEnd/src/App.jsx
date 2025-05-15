import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import AddEmp from "./Components/SingUp/AddEmp";
import EmpList from "./Components/EmpList/EmpList";
import EmpDetails from "./Components/EmpDetails/EmpDetails";
import EmployeeUpdate from "./Components/UpdateEmployee/EmployeeUpdate";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employeelist" element={<EmpList />} />
          <Route path="/addemployee" element={<AddEmp />} />
          <Route path="/login" element={<Login />} />


          <Route path="/empdetails/:id" element={<EmpDetails />} />
          <Route path="/updateemp/:id" element={<EmployeeUpdate />} />
          <Route
            path="*"
            element={<h1 style={{ color: "red" }}>Page Not Found</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
