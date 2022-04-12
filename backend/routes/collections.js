const express = require('express');
const router = express.Router();
const {collections} = require('../controller/collectionController');


router.post('/', collections)

module.exports = router;



 
