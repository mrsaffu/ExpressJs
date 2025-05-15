import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="employeelist">Employee List</NavLink>
        </li>

        <li>
          <NavLink to="addemployee">SingUp</NavLink>
        </li>
        <li>
          <NavLink to="login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
