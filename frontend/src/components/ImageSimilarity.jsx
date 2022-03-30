import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import Buffer from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: 'notforthieves',
    region: 'us-west-1',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
}

const uploadFile = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
    .then(data => console.log(data.location))
    .catch(err => console.error(err))
}

const ImageSimilarity = () => {
    return ( 
        <div className="imageSimilarity">
            <div className="imageSimilarityContainer">
                <input type="file" onChange={ uploadFile } />

                {/* <form onSubmit={uploadFile}>
                    <input type="file"/>
                    <input type="submit"></input>
                </form> */}
            </div>
        </div>
    );
}

export default ImageSimilarity;