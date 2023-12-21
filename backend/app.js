const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const uri = process.env.uri;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () =>{
    console.log('Connected to db');
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from db');
});

mongoose.connection.on('error', () => {
    console.error.bind(console, 'MongoDB connection error:')
});

//Routes for CRUD ops
app.use('/api', require('./routes/employeeRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});