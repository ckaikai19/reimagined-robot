import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../styles/Home.css";
import axios from "axios";

import profile from "../img/userIcon.png";
import paid from "../img/paid.png";
import unpaid from "../img/unpaid.png";

function Home() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function getUsers() {
      const posts = await axios
        .get(`http://localhost:5001`)
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch(() => console.log("get users Failed"));
    }

    getUsers();
  }, []);

  return (
    <div>
      <header className="home-header">
        <h1 className="home-title">Employee Management System</h1>
        <div className="search-container">
          <input className="input-home" placeholder="Search..." />
          <BsSearch className="search-icon" />
        </div>
      </header>
      <h1 className="employess-title">Employees</h1>
      <div className="table-outer-container">
        <table className="table-container">
          <tr className="table-header">
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Address</th>
            <th>
              <h1 className="add">Add</h1>
            </th>
          </tr>
          {users
            ? users.map((user) => (
                <tr className="table-row">
                  <td>
                    <img src={profile} className="profile" />
                  </td>
                  <td>{`${user.first_name} ${user.last_name}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.paid == "true" ? (
                      <div>
                        <img src={paid} className="status" />
                        Paid
                      </div>
                    ) : (
                      <div>
                        <img src={unpaid} className="status" />
                        unpaid
                      </div>
                    )}
                  </td>
                  <td>{user.position}</td>
                  <td>${user.salary} CAD</td>
                  <td>{user.address}</td>
                  <td>
                    <div className="edit-delete-container">
                      <FaUserEdit className="edit" />
                      <MdDelete className="delete" />
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </table>
      </div>
    </div>
  );
}

export default Home;
