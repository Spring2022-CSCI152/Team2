const express = require('express');
const router = express.Router();
const userTemplate = require('../models/user');

router.post('/signup', (request, response) => {
    const signUp = new userTemplate({
        name:request.body.name,
        email:request.body.email,
        password:request.body.password
    })
    signUp.save()
    .then(data => {
        response.json(data);
    })
    .catch(error =>{
        response.json(error)
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