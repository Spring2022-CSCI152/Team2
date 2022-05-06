require('dotenv').config
const express = require('express');
const { UserRefreshClient } = require('google-auth-library');
const request = require('supertest');

// Testing 'users' routes in the backend
describe('Users', () => {
    let app;
    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use(require('../routes/users'));
    })
    afterEach(() => {
        jest.clearAllMocks();
    })

    // test 'test' route
    it('Should return a test message', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return { select: () => { return { name: 'test' } } } });
        const res = await request(app).get('/test');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('test');
    });

    // test 'profileData' route
    it('Should return a user profile', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { 
            return { select: () => { 
                return { then: () => {
                    return { catch: () => {
                        return { name: 'test', email:'test@gmail.com' }
                    } }
                } }
            } }
        });
        const res = await request(app).get('/profileData');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('test');
        expect(res.body.email).toBe('test@gmail.com');
    });


})
