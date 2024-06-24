// seeders/index.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedLearningMethods = require('./learningMethodSeeder');
const seedTechnologiesAdopted = require('./technologyAdoptedSeeder'); // Import other seeders as needed

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
});

// Function to run all seeders
const seedAll = async () => {
    try {
        await seedLearningMethods();
        await seedTechnologiesAdopted(); // Call other seeders as needed
        console.log('All data seeded');
    } catch (error) {
        console.error('Error seeding data', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the seeder
seedAll();
