const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require("dotenv").config();

// Connect to database
connectDB();

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});