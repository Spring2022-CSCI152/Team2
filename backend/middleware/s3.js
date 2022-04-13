const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.bucketName
const region = process.env.bucketRegion
const accessKeyId = process.env.AWSAccessKeyId
const secretAccessKey = process.env.AWSSecretKey

const s3 = new S3({

    region,
    accessKeyId,
    secretAccessKey

})

export function uploadFile(file){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        key: file.name
    }

    return s3.upload(uploadParams).promise()

}

exports.uploadFile = uploadFile

//downloads a file from s3

//not tested yet

/*

function getFileStream(fileKey){
    const downloadParams = {
        key: fileKey
        bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()

}

exports.getFileStream = getFileStream

*/