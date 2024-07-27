// test/technologyAdopted.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app'); // Ensure this is the correct path to your app entry point
const TechnologyAdopted = require('../src/models/technologyAdoptedModel');
const config = require('../src/config');

describe('Technology Adopted API', () => {
    beforeAll(async () => {
        // Connect to the database
        await mongoose.connect(config.dbConnectionString);
    });

    beforeEach(async () => {
        // Clear the database before each test
        await TechnologyAdopted.deleteMany({});
    });

    afterAll(async () => {
        // Disconnect from the database after all tests
        await mongoose.disconnect();
    });

    describe('GET /api/technologies-adopted', () => {
        it('should get all adopted technologies', async () => {
            const res = await request(app).get('/api/technologies-adopted');
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(0); // Ensure no records initially
        });
    });

    describe('POST /api/technologies-adopted', () => {
        it('should create new technology adopted record', async () => {
            const records = {
                name: 'Test Method',
                semester: 'Fall',
                year: 2023,
                techniques: [
                    {technique: 'Estimation', counts: 5},
                    {technique: 'TDD', counts: 3},
                    {technique: 'Unit Testing', counts: 7},
                    {technique: 'Testing', counts: 4},
                    {technique: 'Git', counts: 2},
                    {technique: 'Communication', counts: 6}
                ]
            };

            const res = await request(app).post('/api/technologies-adopted').send(records);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe('Test Method');
            expect(res.body.semester).toBe('Fall');
            expect(res.body.year).toBe(2023);
            expect(res.body.techniques).toHaveLength(6);

        });
    });

    describe('GET /api/technologies-adopted/:id', () => {
        it('should get a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                name: 'CS633',
                semester: 'Fall',
                year: 2023,
                techniques: [
                    { technique: 'Estimation', counts: 5 },
                    { technique: 'TDD', counts: 3 },
                    { technique: 'Unit Testing', counts: 7 }
                ]
            });
            await record.save();

            const res = await request(app).get(`/api/technologies-adopted/${record._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', record._id.toString());
            expect(res.body.name).toBe('CS633');
            expect(res.body.semester).toBe('Fall');
            expect(res.body.year).toBe(2023);
            expect(res.body.techniques).toHaveLength(3);

            res.body.techniques.forEach((technique, index) => {
                expect(technique).toHaveProperty('technique', record.techniques[index].technique);
                expect(technique).toHaveProperty('counts', record.techniques[index].counts);
            });
        });
    });

    describe('PUT /api/technologies-adopted/:id', () => {
        it('should update a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                name: 'CS633',
                semester: 'Fall',
                year: 2023,
                techniques: [
                    { technique: 'Estimation', counts: 5 },
                    { technique: 'TDD', counts: 3 }
                ]
            });
            await record.save();

            const updatedData = {
                name: 'CS673',
                semester: 'Spring',
                year: 2024,
                techniques: [
                    { technique: 'Integration', counts: 8 },
                    { technique: 'Testing', counts: 4 }
                ]
            };

            const res = await request(app).put(`/api/technologies-adopted/${record._id}`).send(updatedData);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', record._id.toString());
            expect(res.body.name).toBe('CS673');
            expect(res.body.semester).toBe('Spring');
            expect(res.body.year).toBe(2024);
            expect(res.body.techniques).toHaveLength(2);

            res.body.techniques.forEach((technique, index) => {
                expect(technique).toHaveProperty('technique', updatedData.techniques[index].technique);
                expect(technique).toHaveProperty('counts', updatedData.techniques[index].counts);
            });
        });
    });

    describe('DELETE /api/technologies-adopted/:id', () => {
        it('should delete a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                name: 'CS633',
                semester: 'Fall',
                year: 2023,
                techniques: [
                    { technique: 'Estimation', counts: 5 }
                ]
            });
            await record.save();

            const res = await request(app).delete(`/api/technologies-adopted/${record._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('msg', 'Record deleted');

            const deletedRecord = await TechnologyAdopted.findById(record._id);
            expect(deletedRecord).toBeNull();
        });
    });

});
