// test/learningMethodController.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const LearningMethod = require('../src/models/learningMethodModel');
const config = require('../src/config'); // Import the config file

describe('Learning Method API', () => {
    beforeAll(async () => {
        // Connect to the database
        await mongoose.connect(config.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    beforeEach(async () => {
        // Clear the database before each test
        await LearningMethod.deleteMany({});
    });

    afterAll(async () => {
        // Disconnect from the database after all tests
        await mongoose.disconnect();
    });

    describe('GET /api/learning-methods', () => {
        it('should get all learning methods', async () => {
            const res = await request(app).get('/api/learning-methods');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(0);
        });
    });

    describe('POST /api/learning-methods', () => {
        it('should create a new learning method', async () => {
            const newMethod = {
                name: 'Test Method',
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
            };

            const res = await request(app).post('/api/learning-methods').send(newMethod);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe('Test Method');
            expect(res.body.semester).toBe('Fall');
            expect(res.body.year).toBe(2024);
            expect(res.body.methods).toBeInstanceOf(Array);
            expect(res.body.methods).toHaveLength(2);
        });
    });

    describe('GET /api/learning-methods/:id', () => {
        it('should get a learning method by id', async () => {
            const method = new LearningMethod({
                name: 'Test Method',
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
            });
            await method.save();

            const res = await request(app).get(`/api/learning-methods/${method._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', method._id.toString());
            expect(res.body.name).toBe('Test Method');
            expect(res.body.semester).toBe('Fall');
            expect(res.body.year).toBe(2024);
            expect(res.body.methods).toBeInstanceOf(Array);
            expect(res.body.methods).toHaveLength(2);
        });
    });

    describe('PUT /api/learning-methods/:id', () => {
        it('should update a learning method by id', async () => {
            const method = new LearningMethod({
                name: 'Test Method',
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
            });
            await method.save();

            const updatedData = {
                name: 'Updated Method',
                semester: 'Spring',
                year: 2025,
                methods: [
                    {
                        method: 'Listening to the lectures',
                        scores: [2, 3, 4, 5, 6],
                    },
                ],
            };

            const res = await request(app).put(`/api/learning-methods/${method._id}`).send(updatedData);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', method._id.toString());
            expect(res.body.name).toBe('Updated Method');
            expect(res.body.semester).toBe('Spring');
            expect(res.body.year).toBe(2025);
            expect(res.body.methods).toBeInstanceOf(Array);
            expect(res.body.methods).toHaveLength(1);
            expect(res.body.methods[0].scores).toEqual([2, 3, 4, 5, 6]);
        });
    });

    describe('DELETE /api/learning-methods/:id', () => {
        it('should delete a learning method by id', async () => {
            const method = new LearningMethod({
                name: 'Test Method',
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
            });
            await method.save();

            const res = await request(app).delete(`/api/learning-methods/${method._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('msg', 'Record deleted');
        });
    });
});
