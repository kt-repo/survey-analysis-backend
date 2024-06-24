// src/controllers/technologyAdoptedController.js

const TechnologyAdopted = require('../models/technologyAdoptedModel');
const { updateTechniqueCounts } = require('../services/technologyAdoptionService');

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
        const { name, semester, year, studentResponses } = req.body;

        const record = new TechnologyAdopted({
            name,
            semester,
            year,
            studentResponses
        });

        await record.save();

        // Update technique counts after saving the record
        await updateTechniqueCounts(record._id);

        const updatedRecord = await TechnologyAdopted.findById(record._id);
        res.status(201).json(updatedRecord);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

exports.updateTechnologyAdopted = async (req, res) => {
    try {
        const { name, semester, year, studentResponses } = req.body;

        const record = await TechnologyAdopted.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name,
                    semester,
                    year,
                    studentResponses
                }
            },
            { new: true, runValidators: true }
        );

        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }

        // Update technique counts after updating the record
        await updateTechniqueCounts(record._id);

        const updatedRecord = await TechnologyAdopted.findById(record._id);
        res.status(200).json(updatedRecord);
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

exports.addTagToResponse = async (req, res) => {
    try {
        const { id, responseId } = req.params;
        const { techniques } = req.body; // Expect an array of techniques

        console.log('Record ID:', id);
        console.log('Response ID:', responseId);
        console.log('Techniques:', techniques);

        const record = await TechnologyAdopted.findById(id);
        if (!record) {
            console.log('Record not found');
            return res.status(404).json({ msg: 'Record not found' });
        }

        const response = record.studentResponses.id(responseId);
        if (!response) {
            console.log('Response not found');
            return res.status(404).json({ msg: 'Response not found' });
        }

        // Add each technique to the response's techniqueTags array
        techniques.forEach(technique => {
            response.techniqueTags.push({ technique });
        });

        await record.save();

        res.status(200).json(record);
    } catch (error) {
        console.error('Failed to add tags:', error);
        res.status(400).json({ error: 'Invalid data' });
    }
};

exports.removeTagFromResponse = async (req, res) => {
    try {
        const { id, responseId, tagId } = req.params;

        console.log('Record ID:', id);
        console.log('Response ID:', responseId);
        console.log('Tag ID:', tagId);

        const record = await TechnologyAdopted.findById(id);
        if (!record) {
            console.log('Record not found');
            return res.status(404).json({ msg: 'Record not found' });
        }

        const response = record.studentResponses.id(responseId);
        if (!response) {
            console.log('Response not found');
            return res.status(404).json({ msg: 'Response not found' });
        }

        // Using pull to remove the subdocument
        response.techniqueTags.pull(tagId);

        await record.save();

        res.status(200).json(record);
    } catch (error) {
        console.error('Failed to remove tag:', error);
        res.status(400).json({ error: 'Invalid data' });
    }
};

