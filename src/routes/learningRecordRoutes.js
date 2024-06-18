// src/routes/learningRecordRoutes.js
const express = require('express');
const learningRecordController = require('../controllers/learningRecordController');
const { check } = require('express-validator');

const validateRecord = [
    check('name', 'Name is required').not().isEmpty(),
    check('semester', 'Semester is required').not().isEmpty(),
    check('year', 'Year is required').isInt(),
    check('data.*.method', 'Method is required').not().isEmpty(),
    check('data.*.ranking', 'Ranking must be an array of numbers').isArray()
];

const router = express.Router();

router.get('/', learningRecordController.getLearningRecords);
router.get('/:id', learningRecordController.getLearningRecordById);
router.post('/', validateRecord, learningRecordController.createLearningRecord);
router.put('/:id', validateRecord, learningRecordController.updateLearningRecord);
router.delete('/:id', learningRecordController.deleteLearningRecord);

module.exports = router;
