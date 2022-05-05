// require('dotenv').config;
// import Server from '../server/server';
// import request from 'supertest';
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const bcrypt = require('bcrypt');

// describe('Successul Login', async () => {
//     // Stub variables here i guess
//     it('idfk man', async () => {
//         jest.spyOn(User, 'findOne').mockImplementation(() => { return 1; });

//         jest.spyOn(bcrypt, 'compare').mockImplementation(() => { return 1; });

//         jest.spyOn(jwt, 'sign').mockImplementation(() => { return 1; });

//         const res = await (await request(Server).post('/login')).send({
//             email: "TestEmail",
//             password: "TestPassword"
//         });

//         expect(res.statusCode).toBe(200);
//     } )
// })