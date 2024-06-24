// src/services/technologyAdoptionService.js

const TechnologyAdopted = require('../models/technologyAdoptedModel');
const Fuse = require('fuse.js');

const possibleTechniques = [
    'Estimation', 'Test-Driven Development (TDD)', 'Unit Testing', 'Exploratory Estimation', 'Historic Estimation',
    'Integration', 'Project Management', 'Feedback', 'Collaboration', 'Version Control', 'Git', 'GitHub',
    'Peer Reviews', 'Best Practices', 'Communication', 'Architecture Design', 'Manual Testing', 'Automated Testing',
    'Wireframing', 'UI/UX Design', 'Personas', 'All-Pairs Testing', 'Blueprints', 'Mock Component Diagrams',
    'API Specifications', 'Documentation', 'Testing'
];

// Configure Fuse.js options
const fuse = new Fuse(possibleTechniques, {
    includeScore: true,
    threshold: 0.7 // Adjust threshold based on desired sensitivity
});

// Function to process student responses
function processResponses(studentResponses) {
    const correlatedResponses = studentResponses.map(responseObj => {
        const response = responseObj.response;
        // Use Fuse.js to find matching techniques
        const fuseResults = fuse.search(response);
        // Log the results for debugging
        console.log('Fuse.js results for response:', response, fuseResults);
        // Map the results to an array of technique objects
        const matchedTechniques = fuseResults.map(result => ({ technique: result.item }));
        return {
            response: responseObj.response,
            techniqueTags: matchedTechniques // This is an array of matched techniques
        };
    });

    return correlatedResponses; // This returns an array of response objects with their technique tags
}

// Function to update technique counts
async function updateTechniqueCounts(technologyAdoptedId) {
    try {
        const techAdopted = await TechnologyAdopted.findById(technologyAdoptedId);
        if (!techAdopted) {
            throw new Error('TechnologyAdopted record not found');
        }

        const techniqueCounts = {};
        possibleTechniques.forEach(technique => {
            techniqueCounts[technique] = 0;
        });

        const matchedTechniques = processResponses(techAdopted.studentResponses);
        console.log('Matched Techniques:', JSON.stringify(matchedTechniques, null, 2));  // Log matched techniques with pretty print

        matchedTechniques.forEach(technique => {
            if (techniqueCounts.hasOwnProperty(technique)) {
                techniqueCounts[technique]++;
            }
        });

        techAdopted.studentResponses = matchedTechniques;

        await techAdopted.save();
        return techAdopted;
    } catch (error) {
        console.error('Failed to update technique counts:', error);
        throw error;
    }
}

module.exports = { updateTechniqueCounts };
