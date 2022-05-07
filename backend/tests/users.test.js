require('dotenv').config
const express = require('express');
const request = require('supertest');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

jest.mock('bcryptjs');

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
        jest.restoreAllMocks();
    })

    // Clear Alerts
    it('should clear alerts', async () => {
        const mock = jest.spyOn(User, 'updateMany');
        mock.mockImplementation(() => { return { cleared: true }; });
        const res = await request(app).post('/clearAlerts');
        expect(res.statusCode).toBe(200);
        expect(res.body.cleared).toBe(true);

        mock.mockRestore();
    });

    // Register (already exists)
    it('should not register a user', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return true } );
        const res = await request(app).post('/register').send({ name: 'test', email: 'test@gmail.com', password: 'test123', password2: 'test123' });
        expect(res.statusCode).toBe(400);
        expect(res.body.email).toBe("Email already exists");
    });

    // Register (success)
    it('should register a user', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return false } );
        const res = await request(app).post('/register').send({ name: 'test', email: 'test@gmail.com', password: 'test123', password2: 'test123' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('test');
        expect(res.body.email).toBe('test@gmail.com');
        expect(res.body.password).toBe('test123');
    });

    // Login (success)
    it('should login a user', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return {id: '1', email: 'test@gmail.com', password: 'test123'} } );
        bcrypt.compare.mockImplementation(() => { return true } );
        const res = await request(app).post('/login').send({ email: 'test@gmail.com', password: 'test123' });
        expect(res.statusCode).toBe(200);
        expect(res.body.user).toBe('1');
    });

    // Login (failure - email not found)
    it('should not login a user', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return null } );
        const res = await request(app).post('/login').send({ email: 'test@gmail.com', password: 'test123' });
        expect(res.statusCode).toBe(404);
        expect(res.body.emailnotfound).toBe("Email not found");
    });

    // Login (failure - password incorrect)
    it('should not login a user', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return {id: '1', email: 'test@gmail.com', password: 'test123'} } );
        bcrypt.compare.mockImplementation(() => { return false } );
        const res = await request(app).post('/login').send({ email: 'test@gmail.com', password: 'test123' });
        expect(res.statusCode).toBe(400);
        expect(res.body.passwordincorrect).toBe("Incorrect password");
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

    // test 'updateProfileData' route failure
    it('Should fail on updating user profile', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return false });
        const res = await request(app).post('/updateProfileData');
        expect(res.status).toBe(400);
        expect(res.body.email).toBe("User does not exists");
    });

    // test 'updateProfileData' route
    it('Should update a user profile', async () => {
        // Set mock spy on User.findOne
        const mock = jest.spyOn(User, 'findOne');
        // Implement Mock return that returns a UserModel
        mock.mockImplementation(() => { 
            return UserModel({profileImg: 'test', name: 'test', email:'testing@gmail.com', password:'test123', bio: 'test', socials: { instagram: 'test', twitter: 'test' }})
        });
        // Send post request to /updateProfileData 
        const res = await request(app).post('/updateProfileData').send({ profileImg: 'test1', name: 'test1', bio: 'test1', socials: { instagram: 'test1', twitter: 'test1' } });
        // Asserts
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('test1');
    });   

})
