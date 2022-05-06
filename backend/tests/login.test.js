require('dotenv').config();
const supertest = require('supertest');
const request = require('supertest');
const express = require('express');
const router = require('../routes/users');


describe('login', () => {
    let app;
    beforeAll(() =>{
        app = express();
       
        app.use('/', router);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should recieve a success code 404 because user is not in the database since find one hasnt been mocked', async () =>{
        const payload = {
            email: "testEmail",
            password: "testPassword"
        }

        const res = await request(app).get('/login').send(payload)
        expect(res.status).toBe(404)
    })

    it('should recieve status code 200 because user is in database', async () => {
      
        const payload = {
            email: "test@gmail.com",
            password: "testPassword"
        }

        jest.spyOn(User, 'findOne').mockImplementation(()=>{
            return { select: () => { 
                return { then: () => {
                    return { catch: () => {
                        return jest.spyOn(Bcrypt, 'compare').mockImplementation(()=>{
                            return { select: () => { 
                                return { then: () => {
                                    return { catch: () => {
                                            return true
                                        
                                         } }
                                    } }
                                }}
                            })
                        
                        
                         } }
                    } }
                }}
            })

    
             
        


        const res = await request(app).get('/login').send(payload)
        expect(res.status).toBe(200)
        
        
    })
   
 })