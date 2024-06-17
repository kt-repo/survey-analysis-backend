// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const corsMiddleware = require('./middleware/cors');

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use('/api', userRoutes);

mongoose.connect(config.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = app;
