import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const StudentForm = () => {

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const username = localStorage.getItem('user'); // Retrieve username from localStorage
        const response = await axios.get(`http://localhost:3002/api/getstudent/${username}`);
        setStudentData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        {error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : studentData ? (
          <Container maxWidth="sm">
            <Paper elevation={3} className="p-4">
              <Typography variant="h5" gutterBottom>
                Student Information
              </Typography>
              <Box mb={2}>
                <Typography variant="body1">
                  <strong>User ID:</strong> {studentData.userid}
                </Typography>
                <Typography variant="body1">
                  <strong>First Name:</strong> {studentData.firstname}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {studentData.lastname}
                </Typography>
                <Typography variant="body1">
                  <strong>Course:</strong> {studentData.course}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {studentData.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Username:</strong> {studentData.username}
                </Typography>
              </Box>
            </Paper>
          </Container>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </div>
    </div>
  )
}

export default StudentForm