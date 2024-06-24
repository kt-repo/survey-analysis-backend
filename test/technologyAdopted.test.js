// test/technologyAdopted.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const TechnologyAdopted = require('../src/models/technologyAdoptedModel');
const config = require('../src/config'); // Import the config file

describe('Technology Adopted API', () => {
    beforeAll(async () => {
        // Connect to the database
        // console.log('Connecting to MongoDB...');
        await mongoose.connect(config.dbConnectionString);
    });

    beforeEach(async () => {
        // Clear the database before each test
        // console.log('Clearing database...');
        await TechnologyAdopted.deleteMany({});
    });

    afterAll(async () => {
        // Disconnect from the database after all tests
        // console.log('Disconnecting from MongoDB...');
        await mongoose.disconnect();
    });

    describe('GET /api/technologies-adopted', () => {
        it('should get all adopted technologies', async () => {
            const res = await request(app).get('/api/technologies-adopted');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(0);
        });
    });

    describe('POST /api/technologies-adopted', () => {
        it('should create a new technology adopted record', async () => {
            const newRecord = {
                studentNumber: 'Student 1',
                adoptedTechniques: 'estimation, TDD, Unit testing'
            };

            const res = await request(app).post('/api/technologies-adopted').send(newRecord);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.studentNumber).toBe('Student 1');
            expect(res.body.adoptedTechniques).toBe('estimation, TDD, Unit testing');
        });
    });

    describe('GET /api/technologies-adopted/:id', () => {
        it('should get a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                studentNumber: 'Student 1',
                adoptedTechniques: 'estimation, TDD, Unit testing'
            });
            await record.save();

            const res = await request(app).get(`/api/technologies-adopted/${record._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', record._id.toString());
            expect(res.body.studentNumber).toBe('Student 1');
            expect(res.body.adoptedTechniques).toBe('estimation, TDD, Unit testing');
        });
    });

    describe('PUT /api/technologies-adopted/:id', () => {
        it('should update a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                studentNumber: 'Student 1',
                adoptedTechniques: 'estimation, TDD, Unit testing'
            });
            await record.save();

            const updatedData = {
                studentNumber: 'Student 2',
                adoptedTechniques: 'integration, testing'
            };

            const res = await request(app).put(`/api/technologies-adopted/${record._id}`).send(updatedData);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', record._id.toString());
            expect(res.body.studentNumber).toBe('Student 2');
            expect(res.body.adoptedTechniques).toBe('integration, testing');
        });
    });

    describe('DELETE /api/technologies-adopted/:id', () => {
        it('should delete a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                studentNumber: 'Student 1',
                adoptedTechniques: 'estimation, TDD, Unit testing'
            });
            await record.save();

            const res = await request(app).delete(`/api/technologies-adopted/${record._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('msg', 'Record deleted');
        });
    });
});
