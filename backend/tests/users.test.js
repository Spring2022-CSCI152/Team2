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

    // Account
    it('should get account', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return { select: () => { return { name: 'test', email: 'test@gmail.com', password: 'test123' } } } } );
        const res = await request(app).get('/account/testId');
        expect(res.statusCode).toBe(200);
        expect(res.body.user.name).toBe('test');
        expect(res.body.user.email).toBe('test@gmail.com');
        expect(res.body.user.password).toBe('test123');
    });

    // Resolve Alert (success)
    it('should resolve alert', async () => {
        const mock = jest.spyOn(User, 'updateOne');
        mock.mockImplementation(() => { return true } );
        const res = await request(app).post('/resolveAlert').send({ userId: '1', alertId: 'testAlert' });
        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe("Alert resolved.");
    });

    // Resolve Alert (failure - alert not found)
    it('should not resolve alert', async () => {
        const mock = jest.spyOn(User, 'updateOne');
        mock.mockImplementation(() => { return false } );
        const res = await request(app).post('/resolveAlert').send({ userId: '1', alertId: 'testAlert' });
        expect(res.statusCode).toBe(404);
        expect(res.body.err).toBe("Alert not found.");
    });

    // getAlerts (success)
    it('should get alerts', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return { alerts: [{ id: '1', name: 'test', email: 'test@gmail.com', password: 'test123' }] } } );
        const res = await request(app).post('/getAlerts').send({ userId: '1' });
        expect(res.statusCode).toBe(200);
        // check that response is stringified JSON
        expect(res.text).toBe('[{"id":"1","name":"test","email":"test@gmail.com","password":"test123"}]');
    });

    // getAlerts (failure - user not found)
    it('should not get alerts', async () => {
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementation(() => { return null } );
        const res = await request(app).post('/getAlerts').send({ userId: '1' });
        expect(res.statusCode).toBe(404);
        expect(res.body.err).toBe("User not found.");
    });

    // updateAlerts (success)
    it('should update alerts', async () => {
        const clusters = [[1, ['test1', 'a']], [2, ['test2', 'd']]];
        const mock = jest.spyOn(User, 'findOne');
        mock.mockImplementationOnce(() => { return { email: 'currentUser' } } );
        mock.mockImplementationOnce(() => { return { email: 'otherUser' } } );
        mock.mockImplementationOnce(() => { return UserModel({ name: 'a', email: 'test@gmail.com', password: 'dwdwwddw',alerts: [] }) } );
        mock.mockImplementationOnce(() => { return { email: 'currentUser' } } );
        mock.mockImplementationOnce(() => { return { email: 'otherUser' } } );
        mock.mockImplementationOnce(() => { return UserModel({ name: 'a', email: 'test@gmail.com', password: 'dwdwwddw',alerts: [] }) } );
        mock.mockImplementationOnce(() => { return { email: 'currentUser' } } );
        mock.mockImplementationOnce(() => { return { email: 'currentUser' } } );
        mock.mockImplementationOnce(() => { return UserModel({ name: 'a', email: 'test@gmail.com', password: 'dwdwwddw',alerts: [] }) } );
        mock.mockImplementationOnce(() => { return { email: 'currentUser' } } );
        mock.mockImplementationOnce(() => { return { email: 'otherUser' } } );
        mock.mockImplementationOnce(() => { return UserModel({ name: 'a', email: 'test@gmail.com', password: 'dwdwwddw',alerts: [] }) } );
        // mock save
        //const save = jest.spyOn(User, 'save');
        //save.mockImplementation(() => { return true } );
        const res = await request(app).post('/updateAlerts').send({ imageClusters: JSON.stringify(clusters)});
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Alerts Updated");
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
        const mock = jest.spyOn(User, 'findOne');
        const user = UserModel({id: '1', profileImg: 'test', name: 'test', email:'testing@gmail.com', password:'test123', bio: 'test', socials: { instagram: 'test', twitter: 'test' }});
        mock.mockImplementation(() => { 
            return {  
                id: '1', profileImg: 'test', name: 'test', email:'testing@gmail.com', password:'test123', bio: 'test', socials: { instagram: 'test', twitter: 'test' }
            } 
        });
        const res = await request(app).post('/updateProfileData').send({ profileImg: 'test1', name: 'test1', bio: 'test1', socials: { instagram: 'test1', twitter: 'test1' } });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('test1');
    });

    

})
