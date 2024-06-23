// src/routes/userRoutes.js
const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.get('/users', userController.getUsers);

// Add more routes as needed

module.exports = router;
