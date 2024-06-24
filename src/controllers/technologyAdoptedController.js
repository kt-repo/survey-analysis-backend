// src/controllers/technologyAdoptedController.js

const TechnologyAdopted = require('../models/technologyAdoptedModel');

exports.getTechnologiesAdopted = async (req, res) => {
    try {
        const records = await TechnologyAdopted.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.getTechnologyAdoptedById = async (req, res) => {
    try {
        const record = await TechnologyAdopted.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.createTechnologyAdopted = async (req, res) => {
    try {
        const record = new TechnologyAdopted(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

exports.updateTechnologyAdopted = async (req, res) => {
    try {
        const record = await TechnologyAdopted.findByIdAndUpdate(
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

exports.deleteTechnologyAdopted = async (req, res) => {
    try {
        const record = await TechnologyAdopted.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }

        res.status(200).json({ msg: 'Record deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
