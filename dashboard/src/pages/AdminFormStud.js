import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SidebarAdmin from "../components/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminFormStud = () => {
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [newUser, setNewUser] = useState({
    userid: "",
    firstname: "",
    lastname: "",
    course: "",
    year: "",
    username: "",
    password: "",
    UserType: "student", // Assuming UserType should be included for admin users
  });

  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      // Fetch data or perform other actions
      axios
        .get("http://localhost:3002/api/getstudents")
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [navigate]);

  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3002/api/editstudent/${selectedUser.userid}`,
        selectedUser
      );
      setUsers(
        users.map((user) =>
          user.userid === selectedUser.userid ? selectedUser : user
        )
      );
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/createuser",
        newUser
      );
      setNewUser({
        userid: "",
        firstname: "",
        lastname: "",
        course: "",
        year: "",
        username: "",
        password: "",
        UserType: "student", // Reset UserType as well
      });
      setOpenAdd(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Form</h1>
          <Button variant="contained" color="primary" onClick={handleAddOpen}>
            Add User
          </Button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">UserID</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Password</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userid}>
                <td className="px-4 py-2 border">{user.userid}</td>
                <td className="px-4 py-2 border">{user.firstname}</td>
                <td className="px-4 py-2 border">{user.lastname}</td>
                <td className="px-4 py-2 border">{user.course}</td>
                <td className="px-4 py-2 border">{user.year}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.password}</td>
                <td className="px-4 py-2 border">
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditOpen(user)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit User Modal */}
        <Modal open={openEdit} onClose={handleEditClose}>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-xl mb-4">Add User</h2>

              <TextField
                label="UserID"
                value={selectedUser.userid}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, userid: e.target.value })
                }
              />
              <TextField
                label="First Name"
                value={selectedUser.firstname}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    firstname: e.target.value,
                  })
                }
              />
              <TextField
                label="Last Name"
                value={selectedUser.lastname}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, lastname: e.target.value })
                }
              />
              <TextField
                label="Course"
                value={selectedUser.course}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, course: e.target.value })
                }
              />
              <TextField
                label="Year"
                value={selectedUser.year}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, year: e.target.value })
                }
              />
              <TextField
                label="Username"
                value={selectedUser.username}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
              />
              <TextField
                label="Password"
                value={selectedUser.password}
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
              />
              <div className="flex justify-end mt-4">
                <Button onClick={handleEditClose} className="mr-2">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditSubmit}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Add User Modal */}
        <Modal open={openAdd} onClose={handleAddClose}>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-xl mb-4">Add User</h2>
              <TextField
                label="UserID"
                value={newUser.userid}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, userid: e.target.value })
                }
              />
              <TextField
                label="First Name"
                value={newUser.firstname}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, firstname: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                value={newUser.lastname}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, lastname: e.target.value })
                }
              />
              <TextField
                label="course"
                value={newUser.course}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, course: e.target.value })
                }
              />
              <TextField
                label="Year"
                value={newUser.year}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, year: e.target.value })
                }
              />
              <TextField
                label="Username"
                value={newUser.username}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <TextField
                label="Password"
                value={newUser.password}
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <div className="flex justify-end mt-4">
                <Button onClick={handleAddClose} className="mr-2">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSubmit}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminFormStud;
