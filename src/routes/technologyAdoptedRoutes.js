// src/routes/technologyAdoptedRoutes.js

const express = require('express');
const technologyAdoptedController = require('../controllers/technologyAdoptedController');
const { check } = require('express-validator');

const validateRecord = [
    check('studentNumber', 'Student number is required').not().isEmpty(),
    check('adoptedTechniques', 'Adopted techniques are required').not().isEmpty()
];

const router = express.Router();

router.get('/', technologyAdoptedController.getTechnologiesAdopted);
router.get('/:id', technologyAdoptedController.getTechnologyAdoptedById);
router.post('/', validateRecord, technologyAdoptedController.createTechnologyAdopted);
router.put('/:id', validateRecord, technologyAdoptedController.updateTechnologyAdopted);
router.delete('/:id', technologyAdoptedController.deleteTechnologyAdopted);

module.exports = router;
