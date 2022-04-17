const express = require('express');
const router = express.Router();
const userTemplate = require('../models/user');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin');

// Load User model for searching 
const User = require('../models/user');

//Note these routes could be right could be wrong. Edit and correct over time
router.post('/index', (req, res) => {
    // Some code
});

router.post('/about', (req, res) => {
    // Some code
});

router.post('/alerts', (req, res) => {
    // Some code
});

router.post('/account', requireLogin, (req, res) => {
    res.redirect('/login');
});

router.get('/search',  (req, res) => {
    
     res.send("hi");
   { /* User.find({username: req.body.searchTerm}).then( user => {
       
         return res.json(user).catch(err => console.log(err));
         
    }) */}

   
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