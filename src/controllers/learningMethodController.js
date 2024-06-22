// src/controllers/learningMethodController.js

const LearningMethod = require('../models/learningMethodModel');

exports.getLearningMethods = async (req, res) => {
    try {
        const records = await LearningMethod.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getLearningMethodById = async (req, res) => {
    try {
        const record = await LearningMethod.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.createLearningMethod= async (req, res) => {
    try {
        const record = new LearningMethod(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

exports.updateLearningMethod = async (req, res) => {
    try {
        const record = await LearningMethod.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

exports.deleteLearningMethod = async (req, res) => {
    try {
        const record = await LearningMethod.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }

        res.status(200).json({ msg: 'Record deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
