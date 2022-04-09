const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateCollectionsInput(data) {
    let errors = {};

    data.name = !isEmpty(data.imgName) ? data.imgName : "";

    if (Validator.isEmpty(data.imgName)){
        errors.imgName = "ImgName field is required"; 
    }


    return { 
        errors, 
        isValid: isEmpty(errors)
    };

}