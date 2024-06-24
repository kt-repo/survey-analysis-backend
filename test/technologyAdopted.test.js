// test/technologyAdopted.test.js

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app'); // Ensure this is the correct path to your app entry point
const TechnologyAdopted = require('../src/models/technologyAdoptedModel');
const config = require('../src/config');
const { updateTechniqueCounts } = require('../src/services/technologyAdoptionService');

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
            expect(res.body).toHaveLength(0);
        });
    });

    describe('POST /api/technologies-adopted', () => {
        it('should create a new technology adopted record', async () => {
            const newRecord = {
                name: 'John Doe',
                semester: 'Fall',
                year: 2023,
                studentResponses: [
                    { response: 'I used Estimation techniques in my project.' },
                    { response: 'Test-Driven Development (TDD) was crucial for our success.' },
                    { response: 'We relied heavily on Unit Testing to ensure quality.' }
                ]
            };

            const res = await request(app).post('/api/technologies-adopted').send(newRecord);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.name).toBe('John Doe');
            expect(res.body.semester).toBe('Fall');
            expect(res.body.year).toBe(2023);

            // Check each response individually
            res.body.studentResponses.forEach((response, index) => {
                expect(response).toHaveProperty('_id');
                expect(response).toHaveProperty('response', newRecord.studentResponses[index].response);
                expect(response.techniqueTags).toBeInstanceOf(Array);
            });

            // // Additional check to ensure the techniqueTags are being updated
            // const savedRecord = await TechnologyAdopted.findById(res.body._id);
            // expect(savedRecord.studentResponses[0].techniqueTags).toEqual(
            //     expect.arrayContaining([{ technique: 'Estimation' }])
            // );
            // expect(savedRecord.studentResponses[1].techniqueTags).toEqual(
            //     expect.arrayContaining([{ technique: 'Test-Driven Development (TDD)' }])
            // );
            // expect(savedRecord.studentResponses[2].techniqueTags).toEqual(
            //     expect.arrayContaining([{ technique: 'Unit Testing' }])
            // );
        });
    });

    describe('GET /api/technologies-adopted/:id', () => {
        it('should get a technology adopted record by id', async () => {
            // Create and save the record
            const record = new TechnologyAdopted({
                name: 'John Doe',
                semester: 'Fall',
                year: 2023,
                studentResponses: [
                    { response: 'I used Estimation techniques in my project.' },
                    { response: 'Test-Driven Development (TDD) was crucial for our success.' },
                    { response: 'We relied heavily on Unit Testing to ensure quality.' }
                ]
            });
            await record.save();

            // Ensure technique counts are updated
            await updateTechniqueCounts(record._id);

            // Fetch the record by id
            const res = await request(app).get(`/api/technologies-adopted/${record._id}`);
            console.log('Response body:', res.body);  // Log the full response body

            // Assert the response status and structure
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', record._id.toString());
            expect(res.body.name).toBe('John Doe');
            expect(res.body.semester).toBe('Fall');
            expect(res.body.year).toBe(2023);

            // Check each response individually
            res.body.studentResponses.forEach((response, index) => {
                expect(response).toHaveProperty('_id');
                expect(response).toHaveProperty('response', record.studentResponses[index].response);
                expect(response.techniqueTags).toBeInstanceOf(Array);
            });

            // // Assert individual technique tags
            // const responses = res.body.studentResponses;
            // const estimationTags = responses[0].techniqueTags.map(t => t.technique);
            // const tddTags = responses[1].techniqueTags.map(t => t.technique);
            // const unitTestingTags = responses[2].techniqueTags.map(t => t.technique);
            //
            // expect(estimationTags).toContain('Estimation');
            // expect(tddTags).toContain('Test-Driven Development (TDD)');
            // expect(unitTestingTags).toContain('Unit Testing');
        });
    });

    describe('PUT /api/technologies-adopted/:id', () => {
        it('should update a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                name: 'John Doe',
                semester: 'Fall',
                year: 2023,
                studentResponses: [
                    { response: 'I used Estimation techniques in my project.' },
                    { response: 'Test-Driven Development (TDD) was crucial for our success.' },
                    { response: 'We relied heavily on Unit Testing to ensure quality.' }
                ]
            });
            await record.save();

            const updatedData = {
                name: 'Jane Doe',
                semester: 'Spring',
                year: 2024,
                studentResponses: [
                    { response: 'Integration was key for our project.' },
                    { response: 'We focused on thorough Testing throughout the process.' }
                ]
            };

            const res = await request(app).put(`/api/technologies-adopted/${record._id}`).send(updatedData);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', record._id.toString());
            expect(res.body.name).toBe('Jane Doe');
            expect(res.body.semester).toBe('Spring');
            expect(res.body.year).toBe(2024);

            // Check each response individually
            res.body.studentResponses.forEach((response, index) => {
                expect(response).toHaveProperty('_id');
                expect(response).toHaveProperty('response', updatedData.studentResponses[index].response);
                expect(response.techniqueTags).toBeInstanceOf(Array);
            });

            // // Additional check to ensure the techniqueTags are being updated
            // const updatedRecord = await TechnologyAdopted.findById(record._id);
            // expect(updatedRecord.studentResponses[0].techniqueTags).toEqual(
            //     expect.arrayContaining([{ technique: 'Integration' }])
            // );
        });
    });

    describe('DELETE /api/technologies-adopted/:id', () => {
        it('should delete a technology adopted record by id', async () => {
            const record = new TechnologyAdopted({
                name: 'John Doe',
                semester: 'Fall',
                year: 2023,
                studentResponses: [
                    { response: 'I used Estimation techniques in my project.' },
                    { response: 'Test-Driven Development (TDD) was crucial for our success.' },
                    { response: 'We relied heavily on Unit Testing to ensure quality.' }
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

    describe('POST /api/technologies-adopted/:id/responses/:responseId/tags', () => {
        it('should add multiple tags to a response', async () => {
            const record = new TechnologyAdopted({
                name: 'John Doe',
                semester: 'Fall',
                year: 2023,
                studentResponses: [
                    { response: 'I used Estimation techniques in my project.' },
                    { response: 'Test-Driven Development (TDD) was crucial for our success.' },
                    { response: 'We relied heavily on Unit Testing to ensure quality.' }
                ]
            });
            await record.save();

            const techniques = ['Estimation', 'Unit Testing'];
            const res = await request(app)
                .post(`/api/technologies-adopted/${record._id}/responses/${record.studentResponses[0]._id}/tags`)
                .send({ techniques });

            expect(res.status).toBe(200);
            const updatedRecord = await TechnologyAdopted.findById(record._id);
            expect(updatedRecord.studentResponses[0].techniqueTags).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ technique: 'Estimation' }),
                    expect.objectContaining({ technique: 'Unit Testing' })
                ])
            );
        });
    });

    describe('DELETE /api/technologies-adopted/:id/responses/:responseId/tags/:tagId', () => {
        it('should remove a tag from a response', async () => {
            const record = new TechnologyAdopted({
                name: 'John Doe',
                semester: 'Fall',
                year: 2023,
                studentResponses: [
                    { response: 'I used Estimation techniques in my project.', techniqueTags: [{ technique: 'Estimation' }] },
                    { response: 'Test-Driven Development (TDD) was crucial for our success.', techniqueTags: [{ technique: 'Test-Driven Development (TDD)' }] },
                    { response: 'We relied heavily on Unit Testing to ensure quality.', techniqueTags: [{ technique: 'Unit Testing' }] }
                ]
            });
            await record.save();

            const responseId = record.studentResponses[0]._id;
            const tagId = record.studentResponses[0].techniqueTags[0]._id;

            const res = await request(app)
                .delete(`/api/technologies-adopted/${record._id}/responses/${responseId}/tags/${tagId}`);

            expect(res.status).toBe(200);
            const updatedRecord = await TechnologyAdopted.findById(record._id);
            expect(updatedRecord.studentResponses[0].techniqueTags).toEqual([]);
        });
    });
});
