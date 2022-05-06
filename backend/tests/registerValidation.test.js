require('dotenv').config();
const express = require('express');
const request = require('supertest');
const validateRegisterInput = require('../validation/register');

// Testing the registration validation functionality in the backend
describe('Registration validation', () => {
    let app;
    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use(require('../routes/users'));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Empty name field
    it('Should return an error if the name is empty', async () => {
        const data = {
            name: '',
            email: 'TestEmail@gmail.com',
            password: 'TestPass',
            password2: 'TestPass'
        }
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.name).toBe('Name field is required');
    });

    // Empty email field
    it('Should return an error if the email is empty', async () => {
        const data = {
            name: 'TestName',
            email: '',
            password: 'TestPass',
            password2: 'TestPass'
        }
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.email).toBe('Email field is required');
    });

    // Password Tests (Equivalence Partitioning & Boundary Value Analysis)
    // Empty Password field
    it('Should return an error if the password is empty', async () => {
        const data = {
            name: 'TestName',
            email: 'TestPass',
            password: '',
            password2: 'TestPass'
        }
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password must be at least 6 characters');
    });

    // Password length less than 6 characters
    it('Should return an error if the password is less than 6 characters', async () => {
        const data = {
            name: 'TestName',
            email: 'TestPass',
            password: 'Test',
            password2: 'TestPass'
        }
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password must be at least 6 characters');
    });

    // Password length of 1
    it('Should return an error if the password is 1 character', async () => {
        const data = {
            name: 'TestName',
            email: 'TestPass',
            password: '1',
            password2: 'TestPass'
        }
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password must be at least 6 characters');
    });
});