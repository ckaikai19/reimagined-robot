import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../styles/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import profile from "../img/userIcon.png";
import paid from "../img/paid.png";
import unpaid from "../img/unpaid.png";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

function Home() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUsers() {
      const posts = await axios
        .get(`http://localhost:5001`)
        .then((res) => {
          setUsers(res.data);
          // console.log(res.data);
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
          <tbody>
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
                <Popup trigger={<h1 className="add">Add</h1>} modal>
                  <div className="add-container">
                    <h1 className="add-title">Add Employee</h1>
                    <div className="inputs-container">
                      <div className="user-data-container">
                        <h1 className="user-data-title">First Name</h1>
                        <input className="user-data first" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Last Name</h1>
                        <input className="user-data last" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Email</h1>
                        <input className="user-data" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Phone Number</h1>
                        <input className="user-data" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Position</h1>
                        <input className="user-data" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Address</h1>
                        <input className="user-data" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Salary</h1>
                        <input className="salary" type="number" />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Status</h1>
                        <select className="droplist">
                          <option value="paid">Paid</option>
                          <option value="unpaid">Unpaid</option>
                        </select>
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Comment</h1>
                        <textarea className="comment-area"/>
                      </div>
                    </div>
                    <div className="submit-container">
                      <h1 className="submit">Submit</h1>
                    </div>
                  </div>
                </Popup>
              </th>
            </tr>
            {users
              ? users.map((user) => (
                  <tr className="table-row" key={user.id}>
                    <td>
                      <Link to={`/${user.id}`}>
                        <img src={profile} className="profile" />
                      </Link>
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
                          Unpaid
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
