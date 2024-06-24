// src/models/technologyAdoptedModel.js

const mongoose = require('mongoose');

// Define a schema for each technique tag without a count
const techniqueTagSchema = new mongoose.Schema({
    technique: {
        type: String,
        required: true,
        enum: [
            'Estimation', 'Test-Driven Development (TDD)', 'Unit Testing', 'Exploratory Estimation', 'Historic Estimation',
            'Integration', 'Project Management', 'Feedback', 'Collaboration', 'Version Control', 'Git', 'GitHub',
            'Peer Reviews', 'Best Practices', 'Communication', 'Architecture Design', 'Manual Testing', 'Automated Testing',
            'Wireframing', 'UI/UX Design', 'Personas', 'All-Pairs Testing', 'Blueprints', 'Mock Component Diagrams',
            'API Specifications', 'Documentation', 'Testing'
        ]
    }
});

// Define a schema for student responses along with corresponding technique tags
const studentResponseSchema = new mongoose.Schema({
    response: { type: String, required: true },
    techniqueTags: { type: [techniqueTagSchema], default: [] }  // Array of techniques for each response, defaulting to an empty array
});

// Define the schema for the main document
const technologyAdoptedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    studentResponses: { type: [studentResponseSchema], default: [] }  // Array of student responses with corresponding technique tags, defaulting to an empty array
});

const TechnologyAdopted = mongoose.model('TechnologyAdopted', technologyAdoptedSchema);

module.exports = TechnologyAdopted;
