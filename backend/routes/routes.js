
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

router.post('/search/users',  (req, res) => { // queries the user collection and returns JSON of results
    const keyword = req.body.searchTerm.toString();
    const query = {$text: {$search: keyword}};
    const searchScope = {
        username: 1, 
        name: 1, 
        userbio: 1, 
        profileimg: 1
    };
   
    User.find(query,searchScope).then(function(records){
        res.send(JSON.stringify(records))
      });

});
router.post('/search/collections',  (req, res) => {// queries the 'collection' collection and returns JSON of results
    const keyword = req.body.searchTerm.toString();
    const query = {$text: {$search: keyword}};
    
   
    User.find(query).then(function(records){
        res.send(JSON.stringify(records))
      });

});
router.post('/search/images',  (req, res) => { // queries the 'image' collection and returns JSON of results
    const keyword = req.body.searchTerm.toString();
    const query = {$text: {$search: keyword}};
    
   
    User.find(query).then(function(records){
        res.send(JSON.stringify(records))
      });

});
router.get('/featUsers', (req, res) => {
    const query = User.aggregate([
        {$match : {
            "collectionArray" :{
                "$exists": true
            }
        }},
        {$sample: {
            size: 10
        }}]);;
    const searchScope = {
        username: 1, 
        name: 1, 
        userbio: 1, 
        profileimg: 1
    };
    User.find(query,searchScope).then(function(records){
        res.send(JSON.stringify(records))
      });
   

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