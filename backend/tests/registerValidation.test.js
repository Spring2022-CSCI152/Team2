require('dotenv').config();
const express = require('express');
const request = require('supertest');
const validateRegisterInput = require('../validation/register');

// Testing the registration validation functionality in the backend
describe('Registration validation', () => {
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
            name: 'TestName',
            email: 'TestEmail@gmail.com',
            password: 'TestPass',
            password2: 'TestPass'
        }
    });

    // Valid fields
    it('Should return no error if the name is not empty', async () => {
        const res = await validateRegisterInput(data);
        expect(res.isValid).toBe(true);
    });

    // Empty name field
    it('Should return an error if the name is empty', async () => {
        data.name = '';
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.name).toBe('Name field is required');
    });

    // Empty email field
    it('Should return an error if the email is empty', async () => {
        data.email = '';
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.email).toBe('Email field is required');
    });


    // Password Tests (Equivalence Partitioning & Boundary Value Analysis)
    // Empty Password field
    it('Should return an error if the password is empty', async () => {
        data.password = '';
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password must be at least 6 characters');
        expect(res.body.password2).toBe('Passwords must match');
    });

    // Password length less than 6 characters
    it('Should return an error if the password is less than 6 characters', async () => {
        data.password = 'Test';
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password must be at least 6 characters');
    });

    // Password length of 1
    it('Should return an error if the password is 1 character', async () => {
        data.password = '1';
        console.log(data);
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password).toBe('Password must be at least 6 characters');
    });

    // Password length of 6 (Valid)
    it('Should return no error if the password is exactly 6 characters', async () => {
        data.password = '123456';
        data.password2 = '123456';
        const res = await validateRegisterInput(data);
        expect(res.isValid).toBe(true);
    });

    // Password length of 7 (Invalid)
    it('Should return no error if the password is exactly 7 characters', async () => {
        data.password = '1234567';
        data.password2 = '1234567';
        const res = await validateRegisterInput(data);
        expect(res.isValid).toBe(true);
    });

    // Password1 and Password2 do not match
    it('Should return an error if the passwords do not match', async () => {
        data.password = '123456';
        data.password2 = '123457';
        const res = await request(app).post('/register').send(data);
        expect(res.status).toBe(400);
        expect(res.body.password2).toBe('Passwords must match');
    });

});