
const express = require('express');
const router = express.Router();
const userTemplate = require('../models/user');
const bcrypt = require('bcrypt');
const requireLogin = require('../middleware/requireLogin');

// Load User model for searching 
const User = require('../models/user');
const Col = require('../models/collectionsModel');
const { collection } = require('../models/user');

//Note these routes could be right could be wrong. Edit and correct over time
router.post('/index', (req, res) => {
    // Some code
});

router.post('/about', (req, res) => {
    // Some code
});

router.post('/alerts', (req, res) => {
    // Some code
    console.log("in"); //not sure why this needs to be here, but it breaks if you remove it
    
});

router.post('/account', requireLogin, (req, res) => {
    res.redirect('/login');
});

router.post('/search/users', (req, res) => { // queries the user collection and returns JSON of results
    const keyword = req.body.searchTerm.toString();
    const query = { $text: { $search: keyword } };
    const aggr = User.aggregate([
        { $match : { $or: [
           {"username": {$regex: ".*" + keyword + ".*"}},
            {"name": {$regex: ".*" + keyword + ".*"}},
            {"userbio": {$regex: ".*" + keyword + ".*"}}
        ]
        }},
        {$project:{
            _id: 1,
            username: 1,
            name: 1,
            userbio: 1,
            profileimg: 1

        }
        }
    ]);
  

    aggr.then(function (records) {
        res.send(JSON.stringify(records))
    });
  

});
router.post('/search/collections', (req, res) => {// queries the 'collection' collection and returns JSON of results
    const keyword = req.body.searchTerm.toString();
    const aggr = User.aggregate([
        {$unwind : "$collectionArray"},
        { 
            $match : { $or: [
           {"collectionArray.tags": {$regex: ".*" + keyword + ".*"}},
            {"collectionArray.imgName": {$regex: ".*" + keyword + ".*"}},
            {"collectionArray.description": {$regex: ".*" + keyword + ".*"}},
            {"collectionArray.cName": {$regex: ".*" + keyword + ".*"}} ]
       
            }
        },
        {
            $project:{
            _id:1,
            collectionArray: 1,
            username: 1,
            name:1
        }
        },
        {$group: {
            _id: {"postedBy":"$collectionArray.postedBy","cName":"$collectionArray.cName"},
             name : { $first: '$name' },
              cName : { $first: '$collectionArray.cName' },
              images : {$push:"$collectionArray.imgURL"}
            
          }}
    ]);
    aggr.then(function (records) {
        res.send(JSON.stringify(records))
    });
});
router.post('/search/images', (req, res) => { // queries the 'image' collection and returns JSON of results
  
  
    const keyword = req.body.searchTerm.toString();

    const aggr = User.aggregate([
        {$unwind : "$collectionArray"},
        { $match : { $or: [
           {"collectionArray.tags": {$regex: ".*" + keyword + ".*"}},
            {"collectionArray.imgName": {$regex: ".*" + keyword + ".*"}},
            {"collectionArray.description": {$regex: ".*" + keyword + ".*"}}
        ]
        }},
        {$project:{
            collectionArray:1
        }
        }
    ]);

    aggr.then(function (records) {
        res.send(JSON.stringify(records))
    });
   
   
});
router.get('/featUsers', (req, res) => {
    const query = User.aggregate([{
        $sample: {
            size: 10
        }
    }, {
        $match: {
            collectionArray: {
                $exists: true
            }
        }
    },
    { $project: { _id: 1, profileimg: 1, userbio: 1, username: 1, name: 1 } }
    ]);
    query.then(function (records) {
        res.send(JSON.stringify(records))
    });
});

// Carousel Route (for the home page)
// Gets 7 random users and return 1 random image from their collections for each user
router.get('/carousel', (req, res) => {
    const query = User.aggregate([{
        $sample: {
            size: 7
        }
    }, {
        $match: {
            collectionArray: {
                $exists: true,
                $ne: []
            }
        }
    },
    // return 1 random image from each user's collection
    { $project: { _id: 1, name: 1, profileimg: 1, collectionArray: 1 } },
    ]);
    query.then(function (records) {
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
    const pythonProcess = spawn('python', ["./python/test.py", "hello"]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString());
    });

    res.send({ express: 'process finished' });
});

router.get('/computeSimilarity', (req, res) => {
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["./python/computeSimilarity.py", req.query.imageOne, req.query.imageTwo]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString());
        res.send(data.toString());
    });
});

router.get('/clusterImages', (req, res) => {
    console.log("Starting clusterImages");
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["./python/clusterImages.py"]);//, req.query.imageFiles]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString());
        res.send(data.toString());
    });
});

router.get('/clusterImagesURL', (req, res) => {
    console.log("Starting clusterImages");
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["./python/clusterImagesURL.py", req.query.imageFiles]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString());
        res.send(data.toString());
    });
});

module.exports = router;