// src/models/technologyAdoptedModel.js

const mongoose = require('mongoose');

// Define a schema for student responses along with corresponding technique tags
const techniquesSchema = new mongoose.Schema({
    technique: { type: String, required: true },
    counts: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Count must be non-negative'
        }
    }
});

// Define the schema for the main document
const technologyAdoptedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    techniques: { type: [techniquesSchema], default: [] }  // Array of student responses with corresponding technique tags, defaulting to an empty array
});

const TechnologyAdopted = mongoose.model('TechnologyAdopted', technologyAdoptedSchema);

module.exports = TechnologyAdopted;
