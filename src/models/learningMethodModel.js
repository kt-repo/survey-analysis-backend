// src/models/learningMethodModel.js

const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    method: { type: String, required: true },
    ranking: { type: [Number], required: true }
});

const LearningMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    data: [DataSchema]
});

module.exports = mongoose.model('LearningMethod', LearningMethodSchema);
