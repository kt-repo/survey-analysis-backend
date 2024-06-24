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
router.post('/:id/responses/:responseId/tags', technologyAdoptedController.addTagToResponse); // Add a tag
router.delete('/:id/responses/:responseId/tags/:tagId', technologyAdoptedController.removeTagFromResponse); // Remove a tag

module.exports = router;
