
const express = require('express');
const { collection } = require('../models/collections');
const router = express.Router();
const collections = require('../models/collections');
const validateCollectionsInput = require('../validation/collections');

const collectionSend = (req, res) => {
    // Some code

    const { errors, isValid } = validateCollectionsInput(req.body);

    // Check if valid
    if(!isValid){
        return res.status(400).json(errors);
    }
}