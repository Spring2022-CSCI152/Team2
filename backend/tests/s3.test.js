require('dotenv').config
const express = require('express')
const request = require('supertest');
const s3 = require('../middleware/s3')
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// Testing the s3 middleware
describe('s3', () => {
    let app
    beforeAll(() => {
        app = express()
        app.use(express.json());
        app.use(require('../routes/users'));
    })
    beforeEach (() => {
        jest.clearAllMocks()
    })

    // Testing uploadSingle route

    // Invalid file
    it('Should return an error if the file is invalid', async () => {
        const res = await request(app).post('/uploadSingle');
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Please upload a file');
    })

})