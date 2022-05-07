// require('dotenv').config
// const express = require('express');
// const request = require('supertest');
// const sinon = require('sinon');
// const bcrypt = require('bcryptjs');

// jest.mock('bcryptjs');

// // Testing 'Search' routes in the backend
// describe('Search', () => {
//     let app;
//     var auth;
//     beforeEach(() => {
//         // stub the requireLogin middleware
//         auth = require('../middleware/requireLogin');
//         sinon.stub(auth, 'requireLogin').callsFake((request, response, next) => { next(); });
//         app = express();
//         app.use(express.json());
//         app.use(require('../routes/users'));
//         app.use(require('../routes/routes'));
//     })
//     afterEach(() => {
//         auth.requireLogin.restore();
//         jest.restoreAllMocks();
//     })


//     // test '/search/collections' route
//     it('Should return a user profile', async () => {
//         const mock = jest.spyOn(User, 'findOne');
//         mock.mockImplementation(() => { 
//             return { select: () => { 
//                 return { name: 'test', email: 'test@gmail.com' }
//             } }
//         });
//         const res = await request(app).get('/profileData');
//         expect(res.status).toBe(200);
//         expect(res.body.name).toBe('test');
//         expect(res.body.email).toBe('test@gmail.com');
//     });

// })