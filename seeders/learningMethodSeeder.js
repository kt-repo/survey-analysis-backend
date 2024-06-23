// seeders/learningMethodSeeder.js

const LearningMethod = require('../src/models/learningMethodModel');

const learningMethods = [
    {
        name: 'CS633',
        semester: 'Fall',
        year: 2024,
        methods: [
            {
                method: 'Listening to the lectures',
                scores: [1, 2, 3, 4, 5],
            },
            {
                method: 'Completing assignments',
                scores: [2, 3, 4, 5, 6],
            },
        ],
    },
    {
        name: 'CS637',
        semester: 'Spring',
        year: 2024,
        methods: [
            {
                method: 'Taking quizzes',
                scores: [3, 4, 5, 6, 7],
            },
            {
                method: 'Preparing for and completing the final exam',
                scores: [4, 5, 6, 7, 8],
            },
        ],
    },
];

const seedLearningMethods = async () => {
    try {
        await LearningMethod.deleteMany({});
        console.log('Cleared existing LearningMethod data');
        await LearningMethod.insertMany(learningMethods);
        console.log('Inserted seed LearningMethod data');
    } catch (error) {
        console.error('Error seeding LearningMethod data', error);
    }
};

module.exports = seedLearningMethods;

