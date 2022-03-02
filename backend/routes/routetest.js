const express = require('express');
const router = express.Router();


// Strictly used to test end points of our code. I.e if a request isn't working check here first with postman/REST Client 
// and see if it's the code or an actual request problem
// To test with REST Client, make a test.http file in the backend folder and type in [request] http://localhost:[PORT]/api/dbtest
// a "send request" option should show above line one of the command. Click that and it should send that type of request


// get a list of items from db
// GET http://localhost:[PORT]/api/dbtest
// should return type GET
router.get('/dbtest', function(req,res){
    res.send({type: 'GET'});
});

// add a new item to the db
// POST http://localhost:[PORT]/api/dbtest
// should return type POST
router.post('/dbtest', function(req, res){
    res.send({type: 'POST'});
});

// update an item in the db
// PUT http://localhost:[PORT]/api/dbtest/yoshi
// should return type PUT
// no id should return bad input. ie /dbtest
router.put('/dbtest/:id', function(req, res){
    res.send({type: 'PUT'});
});

// delete an item from the db
// DELETE http://localhost:[PORT]/api/dbtest/yoshi
// should return type DELETE
// no id should return bad input. ie /dbtest
router.delete('/dbtest/:id', function(req, res){
    res.send({type: 'DELETE'});
});

module.exports = router;