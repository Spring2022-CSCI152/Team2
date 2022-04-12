import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import '../assets/NavBar.css';


function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    await axios.get("http://localhost:5000/logout");

    await getLoggedIn();
    navigate("/");
  }

  return <Link onClick={logOut} to={"/logout"} className="loginButton">Logout</Link>;
}

export default LogOutBtn;