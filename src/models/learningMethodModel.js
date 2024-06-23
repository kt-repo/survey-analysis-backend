// src/models/learningMethodModel.js

const mongoose = require('mongoose');

// Define the schema for each learning method and its scores
const methodSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
        enum: [
            'Listening to the lectures',
            'Re-review previous material and recordings',
            'Completing assignments',
            'Taking quizzes',
            'Preparing for and completing the final exam',
            'Providing/receiving comments to/from peers',
            'Collaborating during the term project'
        ]
    },
    scores: {
        type: [Number],
        required: true,
        validate: {
            validator: function(array) {
                return array.length === 5;
            },
            message: 'Scores array must contain exactly 5 elements.'
        }
    }
});

// Define the schema for the main document which includes multiple methods
const learningMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    methods: [methodSchema]
});

const LearningMethod = mongoose.model('LearningMethod', learningMethodSchema);

module.exports = LearningMethod;
