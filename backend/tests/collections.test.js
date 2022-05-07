import request from 'supertest'
const fs = require('fs')
require('dotenv').config
const express = require('express')
const mocks = require('./mocks/fileMock')


const testImage = `${__dirname}/../../../test/imgTests/crystal.png`

describe('Upload endpoint', () => {

    let app
    beforeAll(() => {
        app = express()
        app.use(express.json());
        app.use(require('../routes/users'));
    })
    beforeEach (() => {
        jest.clearAllMocks()
    })

  test('Successfully uploads jpg image', (done) => {
    const payload = {
        _id: '1234',
        email: 'TestEmail',
        password: 'TestPass'
    }
    // Sign the payload as a token
    const token = jwt.sign(payload, process.env.secretKey, { expiresIn: 1000000000 });
    
      const res = request(app)
          .post(`/collections`)
          .set('Cookie', `jwt=${token};`)
          .set('Content-Type','application/json')

      const imgStream = fs.createReadStream(testImage);
      imgStream.on('end', () => req.end(done));
      imgStream.pipe(req, {end: false})

      expect(res.status).toBe(200);
  })
})