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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState(null);

  const [addFirst, setAddFirst] = useState(null);
  const [addLast, setAddLast] = useState(null);
  const [addEmail, setAddEmail] = useState(null);
  const [addPhone, setAddPhone] = useState(null);
  const [addPosition, setAddPosition] = useState(null);
  const [addAddy, setAddAddy] = useState(null);
  const [addSalary, setAddSalary] = useState("paid");
  const [addComment, setAddComment] = useState(null);

  const [editFirst, setEditFirst] = useState("");

  useEffect(() => {
    async function getUsers() {
      const posts = await axios
        .get(`http://localhost:5001`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch(() => console.log("get users Failed"));
    }

    getUsers();
  }, []);

  async function addEmployee() {
    if (
      addFirst &&
      addLast &&
      addEmail &&
      addPhone &&
      addPosition &&
      addSalary &&
      addComment &&
      addAddy
    ) {
      const data = {
        first_name: addFirst,
        last_name: addLast,
        email: addEmail,
        phone: addPhone,
        comments: addComment,
        position: addPosition,
        salary: addSalary,
        address: addAddy,
        paid: "true",
      };

      await axios.post("http://localhost:5001/adduser", data).then((res) => {
        toast.success("Employee Added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      });
    } else {
      toast.error("Please fill all inputs", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function editEmployee() {
    console.log(editFirst);
  }

  async function deleteEmployee(id) {
    await axios
      .get(`http://localhost:5001/${id}`)
      .then((res) => {
        toast.success("Employee Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  async function searchEmployee(event) {
    if (event.key === "Enter") {
      if (search == null || search == "") {
        toast.error("Please fill input", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      const reqEmployee = {
        search: search,
      };

      await axios
        .post(`http://localhost:5001/`, reqEmployee)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <header className="home-header">
        <h1 className="home-title">Employee Management System</h1>
        <div className="search-container">
          <input
            onChange={(value) => setSearch(value.target.value)}
            onKeyDown={searchEmployee}
            className="input-home"
            placeholder="Search..."
          />
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
                        <input
                          onChange={(value) => setAddFirst(value.target.value)}
                          className="user-data first"
                        />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Last Name</h1>
                        <input
                          onChange={(value) => setAddLast(value.target.value)}
                          className="user-data last"
                        />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Email</h1>
                        <input
                          onChange={(value) => setAddEmail(value.target.value)}
                          className="user-data"
                        />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Phone Number</h1>
                        <input
                          onChange={(value) => setAddPhone(value.target.value)}
                          className="user-data"
                        />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Position</h1>
                        <input
                          onChange={(value) =>
                            setAddPosition(value.target.value)
                          }
                          className="user-data"
                        />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Address</h1>
                        <input
                          onChange={(value) => setAddAddy(value.target.value)}
                          className="user-data"
                        />
                      </div>
                      <div className="user-data-container">
                        <h1 className="user-data-title">Salary</h1>
                        <input
                          onChange={(value) => setAddSalary(value.target.value)}
                          className="salary"
                          type="number"
                        />
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
                        <textarea
                          onChange={(value) =>
                            setAddComment(value.target.value)
                          }
                          className="comment-area"
                        />
                      </div>
                    </div>
                    <div className="submit-container">
                      <h1 onClick={addEmployee} className="submit">
                        Submit
                      </h1>
                    </div>
                  </div>
                </Popup>
              </th>
            </tr>
            {users ? (
              users.map((user) => (
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
                      <Popup trigger={<FaUserEdit className="edit" />} modal>
                        {(close) => (
                          <div>
                            <div className="add-container">
                              <h1 className="add-title">{`${user.first_name} ${user.last_name}`}</h1>
                              <div className="inputs-container">
                                <div className="user-data-container">
                                  <h1 className="user-data-title">
                                    First Name
                                  </h1>
                                  <input
                                    value={user.first_name}
                                    onChange={(event) =>
                                      setEditFirst(event.target.value)
                                    }
                                    className="user-data first"
                                  />
                                </div>
                                <div className="user-data-container">
                                  <h1 className="user-data-title">Last Name</h1>
                                  <input
                                    value={user.last_name}
                                    className="user-data last"
                                  />
                                </div>
                                <div className="user-data-container">
                                  <h1 className="user-data-title">Email</h1>
                                  <input
                                    value={user.email}
                                    className="user-data"
                                  />
                                </div>
                                <div className="user-data-container">
                                  <h1 className="user-data-title">
                                    Phone Number
                                  </h1>
                                  <input
                                    value={user.phone}
                                    className="user-data"
                                  />
                                </div>
                                <div className="user-data-container">
                                  <h1 className="user-data-title">Position</h1>
                                  <input
                                    value={user.position}
                                    className="user-data"
                                  />
                                </div>
                                <div className="user-data-container">
                                  <h1 className="user-data-title">Address</h1>
                                  <input
                                    value={user.address}
                                    className="user-data"
                                  />
                                </div>
                                <div className="user-data-container">
                                  <h1 className="user-data-title">Salary</h1>
                                  <input
                                    value={user.salary}
                                    className="salary"
                                    type="number"
                                  />
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
                                  <textarea
                                    value={user.comments}
                                    className="comment-area"
                                  />
                                </div>
                              </div>
                              <div className="submit-container">
                                <h1 className="submit close" onClick={close}>
                                  Close
                                </h1>
                                <h1 onClick={editEmployee} className="submit">
                                  Edit
                                </h1>
                              </div>
                            </div>
                          </div>
                        )}
                      </Popup>

                      <MdDelete
                        onClick={() => deleteEmployee(user.id)}
                        className="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <h1 className="employess-title">No Results</h1>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
