// src/controllers/userController.js
const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(`Retrieved ${users.length} users`); // Console log the number of users retrieved
        console.log(`Hey!`);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add more controller functions as needed
