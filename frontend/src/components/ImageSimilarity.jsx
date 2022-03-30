import React, { Component, useState } from 'react';
import { S3FileUpload, uploadFile } from 'react-s3';
import Buffer from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: 'notforthieves',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
}

const ImageSimilarity = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        console.log(config);
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return ( 
        <div className="imageSimilarity">
            <div className="imageSimilarityContainer">
                <input type="file" onChange={ handleFileInput } />
                <button onClick={ () => handleUpload(selectedFile) }>Upload</button>
            </div>
        </div>
    );
}

export default ImageSimilarity;