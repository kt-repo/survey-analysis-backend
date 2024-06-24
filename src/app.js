// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('./middleware/cors');
const userRoutes = require('./routes/userRoutes');
const learningMethodRoutes = require('./routes/learningMethodRoutes');
const technologyAdoptedRoutes = require('./routes/technologyAdoptedRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/learning-methods', learningMethodRoutes);
app.use('/api/technologies-adopted', technologyAdoptedRoutes);

// connect to database
mongoose.connect(config.dbConnectionString)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

module.exports = app;
