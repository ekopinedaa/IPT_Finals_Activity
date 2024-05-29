import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  // Typography,
  // Box,
  // Grid,
} from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(username, password);
      const response = await axios.post('http://localhost:3002/api/login', {
        username,
        password,
      });

      console.log(response)

      // localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.success) {
        localStorage.setItem('user', username); 
        navigate(response.data.redirectUrl);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center font-montserrat">
      <h1 className="text-4xl font-bold mb-6">School Record System</h1>
      <br />
      <Container maxWidth="xs" className="flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            className="mb-4 font-montserrat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
            className="mb-4 font-montserrat"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
