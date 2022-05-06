require('dotenv').config
const express = require('express');
const request = require('supertest');
const sinon = require('sinon');

// Testing 'users' routes in the backend
describe('Users', () => {
    let app;
    var auth;
    beforeEach(() => {
        // stub the requireLogin middleware
        auth = require('../middleware/requireLogin');
        sinon.stub(auth, 'requireLogin').callsFake((request, response, next) => { next(); });
        app = express();
        app.use(express.json());
        app.use(require('../routes/users'));
    })
    afterEach(() => {
        auth.requireLogin.restore();
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

    // 'testLR'
    it('Should return a test message', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return { select: () => { return { name: 'test' } } } });
        const res = await request(app).get('/testLR')
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('test');
    });

    // test 'profileData' route
    it('Should return a user profile', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { 
            return { select: () => { 
                return { name: 'test', email: 'test@gmail.com' }
            } }
        });
        const res = await request(app).get('/profileData');
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('test');
        expect(res.body.email).toBe('test@gmail.com');
    });


})
