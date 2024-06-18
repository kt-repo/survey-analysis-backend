// src/controllers/learningRecordController.js

const LearningRecord = require('../models/learningRecordModel');

exports.getLearningRecords = async (req, res) => {
    try {
        const records = await LearningRecord.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getLearningRecordById = async (req, res) => {
    try {
        const record = await LearningRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.createLearningRecord = async (req, res) => {
    try {
        const record = new LearningRecord(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

exports.updateLearningRecord = async (req, res) => {
    try {
        const record = await LearningRecord.findByIdAndUpdate(
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

exports.deleteLearningRecord = async (req, res) => {
    try {
        const record = await LearningRecord.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }

        res.status(200).json({ msg: 'Record deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
