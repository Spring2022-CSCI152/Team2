const express = require('express');
const router = express.Router();
const userTemplate = require('../models/user');
const bcrypt = require('bcrypt');

//Note these routes could be right could be wrong. Edit and correct over time
router.post('/index', (request, response) => {
    // Some code
});

router.post('/about', (req, res) => {
    // Some code
});

router.post('/alerts', (req, res) => {
    // Some code
});

router.post('/account', (req, res) => {
    // Some code
});

router.post('/search', (req, res) => {
    // Some code
});

router.post('/collections', (req, res) => {
    // Some code
});

router.post('/user', (req, res) => {
    // Some code
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