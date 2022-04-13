const express = require('express');
const router = express.Router();
const collections = require('../models/collectionsModel');
const validateCollectionsInput = require('../validation/collections');
const multer = require('multer');
const { v4: uuidv4} = require('uuid');
let path = require('path');
const {uploadFile} = require('../middleware/s3')
const LocalStorage = multer({ dest: '../uploads'})
const fs = require('fs')
const utils = require('util')
const unlinkFile = util.promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'images');
    },
    filename: function(req, file, cb){
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));

    }
});


const fileFilter = (req,file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    
    }
    else{
        cb(null, false);
    }
}

let upload = multer({storage, fileFilter});

router.route('/collections').post(requireLogin, upload.single('photo'), async (req, res) => {
    // Some code

    


    const imgName = req.file.filename;
    const { errors, isValid } = validateCollectionsInput(req.body.filename);

    // Check if valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    //setup collections
    const newCollection = new collections(imgName,req.user.id);


    //aws upload
    const file = req.file
    console.log(file)
    await uploadFile(file).then(() => res.json('AWS upload Complete'))
                          .catch(err => res.status(400).json('AwsError: ' + err))


    //mongodb upload
    newCollection.save()
                .then(() => res.json('photo uploaded'))
                .catch(err => res.status(400).json('MongoDBError: ' + err));

    //delete file from local storage
    await unlinkFile(file.path) 

   
});
//router.post('/', requireLogin, collections);

module.exports = router;



 
