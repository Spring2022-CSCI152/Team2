const express = require('express');
const router = express.Router();
const userTemplate = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/signup', (request, response) => {
    // destructuring request
    const { username, email, password } = request.body;

    // check if user already exists
    userTemplate.findOne({name:username})
    .then(user => { // if user exists, return error
        if(user){
            return response.json({
                message: 'User already exists'
            });
        }
        else {
            // if the user doesn't exist, create a new user
            // bcrypt hash the password
            bcrypt.hash(request.body.password, 10, (err, hash) => {
                if (err) { // if error occurs, return error
                    return response.json({
                        error: err
                    });
                } 
                else { // if no error, create a new user
                    // user template
                    const signUp = new userTemplate({
                        name:username,
                        email:email,
                        password:hash
                    })
                    // save user to database
                    signUp.save()
                    .then(data => {
                        response.json(data);
                    })
                    .catch(error =>{
                        response.json(error)
                    })
                }
            })
        }
    })
    .catch(err => { // if error occurs, return error
        return response.json({
            message: 'Error with reading users from database'
        });
    });
});

router.post('/login', (req, res) => {
    // destructuring request
    const { username, email, password } = req.body;
    // Find the user
    userTemplate.findOne({name:username})
    .then(data => {
        // if user exists, compare password
        if (data) {
            // check bcrypt password
            bcrypt.compare(password, data.password, (err, result) => {
                if (err) {
                    return res.json({
                        error: err
                    });
                }
                if (result) {
                    return res.status(200).json({
                        message: 'Auth successful',
                        user: data
                    });
                }
                return res.json({message: 'Invalid password'});
            });
        }
        else {
            return res.json({message: 'User does not exist'});
        }
    })
    .catch(error => {
        res.json(error);
    })
});

router.get('/testScript', (req, res) => {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["./python/test.py", "hello"]);
    pythonProcess.stdout.on('data', (data) => {
      // Do something with the data returned from python script
      console.log(data.toString());
    });
  
    res.send({ express: 'process finished' });
});

module.exports = router;