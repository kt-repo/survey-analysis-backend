// src/models/technologyAdoptedModel.js

const mongoose = require('mongoose');

const technologyAdoptedSchema = new mongoose.Schema({
    studentNumber: { type: String, required: true },
    adoptedTechniques: { type: String, required: true }
});

const TechnologyAdopted = mongoose.model('TechnologyAdopted', technologyAdoptedSchema);

module.exports = TechnologyAdopted;
