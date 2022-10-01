import React, { useState, useEffect } from "react";
import { BsFillSkipBackwardFill } from "react-icons/bs";

import "../styles/Details.css";
import profile from "../img/userIcon.png";
import paid from "../img/paid.png";
import unpaid from "../img/unpaid.png";
import axios from "axios";
import { Link } from "react-router-dom";


function Details() {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function getUser() {
      const posts = await axios
        .get(`http://localhost:5001/viewuser${window.location.pathname}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => console.log("get users Failed"));
    }

    getUser();
  }, []);


  return (
    <div>
      <header className="home-header">
        <h1 className="home-title">Employee Details</h1>
        <div className="back-container">
          <Link to="/">
            <BsFillSkipBackwardFill className="back" />
          </Link>
        </div>
      </header>
      <div className="user-container">
        <div className="user-inner-container">
          <div className="user-left-container">
            <div className="profile-container">
              <img src={profile} className="profile-pik" />
              <div className="status-container">
                <img src={paid} className="status" />
                Salary Paid
              </div>
            </div>
          </div>
          {user ? (
            <div className="user-right-container">
              <div className="user-data-container">
                <h1 className="user-data-title">First Name</h1>
                <h1 className="user-data">{user[0].first_name}</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Last Name</h1>
                <h1 className="user-data">{user[0].last_name}</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Email</h1>
                <h1 className="user-data">{user[0].email}</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Phone Number</h1>
                <h1 className="user-data">{user[0].phone}</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Position</h1>
                <h1 className="user-data">{user[0].position}</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Salary</h1>
                <h1 className="user-data">${user[0].salary} CAD</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Address</h1>
                <h1 className="user-data">{user[0].address}</h1>
              </div>
              <div className="user-data-container">
                <h1 className="user-data-title">Comments</h1>
                <h1 className="user-data">{user[0].comments}</h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Details;
