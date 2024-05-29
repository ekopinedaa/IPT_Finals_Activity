const express = require('express');
const cors = require('cors');
const connectDb = require('../config/db');
const userRouter = require('../routes/user_route');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Routes
app.use('/api', userRouter);
app.get('/', (req, res) => {
  res.json({ message: "testing message" });
});

// Start the server and connect to the database
const startServer = async () => {
  await connectDb(); // Wait for the database connection to be established
};
startServer();

module.exports = app;
