require('dotenv').config();
const express = require('express');
const request = require('supertest');
const validateLoginInput = require('../validation/login');

// Testing the login validation functionality in the backend
describe('Login validation', () => {
    let app;
    let data;
    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use(require('../routes/users'));
    });
    beforeEach(() => {
        jest.clearAllMocks();
        data = {
            email: 'TestEmail@gmail.com',
            password: 'TestPass'
        }
    });

    // Valid fields
    it('Should return no error if the input fields are valid', async () => {
        const res = await validateLoginInput(data);
        expect(res.isValid).toBe(true);
    });

    // Empty email field
    it('Should return an error if the email is empty', async () => {
        data.email = '';
        const res = await request(app).post('/login').send(data);
        expect(res.status).toBe(400);
        expect(res.body.email).toBe('Email field is required');
    });

    // Invalid email
    it('Should return an error if the email is invalid', async () => {
        data.email = 'TestEmail';
        const res = await request(app).post('/login').send(data);
        expect(res.status).toBe(400);
        expect(res.body.email).toBe('Email is invalid');
    });

    // Empty password field
    it('Should return an error if the password is empty', async () => {
        data.password = '';
        const res = await request(app).post('/login').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password field is required');
    });
});