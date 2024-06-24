// seeders/learningMethodSeeder.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const LearningMethod = require('../src/models/learningMethodModel');
const config = require('../src/config'); // Adjust the path to your config file

const seedLearningMethods = async () => {
    try {
        // Read data from the JSON file
        const dataPath = path.join(__dirname, 'learningMethodData.json');
        const learningMethods = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await mongoose.connect(config.dbConnectionString);
        console.log('Connected to MongoDB');

        await LearningMethod.deleteMany({});
        console.log('Cleared existing LearningMethod data');

        await LearningMethod.insertMany(learningMethods);
        console.log('Inserted seed LearningMethod data');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding LearningMethod data', error);
        process.exit(1);
    }
};

module.exports = seedLearningMethods;

// To run the seeder, you can create a script or run it manually:
// node seeders/learningMethodSeeder.js
