// src/routes/learningMethodRoutes.js
const express = require('express');
const learningMethodController = require('../controllers/learningMethodController');
const { check } = require('express-validator');

const validateRecord = [
    check('name', 'Name is required').not().isEmpty(),
    check('semester', 'Semester is required').not().isEmpty(),
    check('year', 'Year is required').isInt(),
    check('data.*.method', 'Method is required').not().isEmpty(),
    check('data.*.ranking', 'Ranking must be an array of numbers').isArray()
];

const router = express.Router();

router.get('/', learningMethodController.getLearningMethods);
router.get('/:id', learningMethodController.getLearningMethodById);
router.post('/', validateRecord, learningMethodController.createLearningMethod);
router.put('/:id', validateRecord, learningMethodController.updateLearningMethod);
router.delete('/:id', learningMethodController.deleteLearningMethod);

module.exports = router;
