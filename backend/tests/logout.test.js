require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const request = require('supertest');
const router = require('../routes/users');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');



describe('logout', () => {
    let requireLogin;
    let app;
    beforeAll(() =>{
        app = express();
        app.use(cookieParser());
        app.use('/', router);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should send back status 200 for cleared cookie', async () => {
        // Simulate a payload -> jwt.sign for a token
        const payload = {
            _id: '1234',
            email: 'TestEmail',
            password: 'TestPass'
        }
        // Sign the payload as a token
        const token = jwt.sign(payload, process.env.secretKey, { expiresIn: 1000000000 });
        
        // Call the get request on logout
        // Replicate application storage by setting the Cookie with token as "jwt=token", set Content-Type and application/json, send()
        const res = await request(app).get('/logout').set('Cookie', `jwt=${token};`)
                    .set('Content-Type','application/json').send();

        // Assert the res status (200 for "OK")
        expect(res.status).toBe(200);
    })

    test('Status result in 401 on undefined jwt', async () => {
        // Set the jwt token as undefined
        const jwt = undefined;

        // Call the get request on logout
        // Replicate application storage by setting the Cookie with token as "jwt=token", set Content-Type and application/json, send()
        const res = await request(app).get('/logout').set('Cookie', `jwt=${jwt};`)
                    .set('Content-Type','application/json').send();
                    
        expect(res.statusCode).toBe(401);
    })

})