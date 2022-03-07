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


module.exports = router;