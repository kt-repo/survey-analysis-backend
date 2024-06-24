// seeders/technologyAdoptedSeeder.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const TechnologyAdopted = require('../src/models/technologyAdoptedModel');
const config = require('../src/config'); // Adjust the path to your config file

const seedTechnologyAdopted = async () => {
    try {
        // Read data from the JSON file
        const dataPath = path.join(__dirname, 'technologyAdoptedData.json');
        const technologyAdoptedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await mongoose.connect(config.dbConnectionString);
        console.log('Connected to MongoDB');

        await TechnologyAdopted.deleteMany({});
        console.log('Cleared existing TechnologyAdopted data');

        await TechnologyAdopted.insertMany(technologyAdoptedData);
        console.log('Inserted seed TechnologyAdopted data');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding TechnologyAdopted data', error);
        process.exit(1);
    }
};

module.exports = seedTechnologyAdopted;

// To run the seeder, you can create a script or run it manually:
// node seeders/technologyAdoptedSeeder.js
