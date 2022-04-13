const express = require('express');
const router = express.Router();
const collections = require('../models/collectionsModel');
const validateCollectionsInput = require('../validation/collections');
const multer = require('multer');
const { v4: uuidv4} = require('uuid');
let path = require('path');
const {uploadFile} = require('../middleware/s3')
const LocalStorage = multer({ dest: '../uploads'})



router.route('/collections').get('/collectionDown/:key', (req, res) => {
    const key =  req.params.key;
    const readStream = getFileStream(key)

    readStream.pipe(res)


});